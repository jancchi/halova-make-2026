import json
import logging

from vertexai.generative_models import GenerationConfig, GenerativeModel


MODEL_NAME = "gemini-2.0-flash-001"

logger = logging.getLogger(__name__)


RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "summary": {"type": "string"},
        "urgency_score": {"type": "integer"},
        "urgency_reasoning": {"type": "string"},
    },
    "required": ["summary", "urgency_score", "urgency_reasoning"],
}


ANALYSIS_SYSTEM_INSTRUCTION = """You are an operations analyst for a startup and VC ecosystem community.
Analyze an incoming support request and return JSON only.

Output fields:
- summary: concise, plain-language summary in max 240 characters.
- urgency_score: integer from 1 to 10.
- urgency_reasoning: one sentence explaining the urgency score.

Urgency rules:
- 8-10: urgent timing, fundraising runway risk, critical hire, hard near-term deadline.
- 5-7: clear actionable request, moderate urgency.
- 1-4: vague ask, low detail, low urgency.

Use the request data, deadline, declared urgency, and context to score urgency."""


class AIPipelineError(Exception):
    pass


def analyze_request(
    *,
    category: str,
    title: str,
    description: str,
    urgency: str,
    deadline: str | None,
    role: str,
    city: str,
    tags: list[str],
) -> dict:
    tags_text = ", ".join(tags) if tags else "none"
    deadline_text = deadline or "not provided"

    user_message = (
        f"Category: {category}\n"
        f"Title: {title}\n"
        f"Description: {description}\n"
        f"Declared urgency: {urgency}\n"
        f"Deadline: {deadline_text}\n"
        f"Requester role: {role}\n"
        f"City: {city}\n"
        f"Tags: {tags_text}"
    )

    try:
        model = GenerativeModel(
            MODEL_NAME, system_instruction=ANALYSIS_SYSTEM_INSTRUCTION
        )
        response = model.generate_content(
            user_message,
            generation_config=GenerationConfig(
                response_mime_type="application/json",
                response_schema=RESPONSE_SCHEMA,
            ),
        )
    except Exception as exc:  # noqa: BLE001
        raise AIPipelineError(str(exc)) from exc

    raw_text = response.text or ""
    logger.info("Raw Gemini response: %s", raw_text)

    try:
        parsed = json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise ValueError("AI returned malformed response") from exc

    return {
        "summary": str(parsed["summary"]),
        "urgency_score": max(1, min(10, int(parsed["urgency_score"]))),
        "urgency_reasoning": str(parsed["urgency_reasoning"]),
    }


def fallback_analysis(
    *, title: str, description: str, urgency: str, deadline: str | None
) -> dict:
    score = 5
    lowered = f"{title} {description}".lower()

    high_keywords = ("urgent", "asap", "runway", "fundraising", "critical", "hiring")
    if any(keyword in lowered for keyword in high_keywords):
        score += 2

    if urgency == "high":
        score += 2
    elif urgency == "low":
        score -= 1

    if deadline:
        score += 1

    score = max(1, min(10, score))

    trimmed_description = " ".join(description.split())
    summary = f"{title}: {trimmed_description}"
    if len(summary) > 240:
        summary = f"{summary[:237]}..."

    return {
        "summary": summary,
        "urgency_score": score,
        "urgency_reasoning": "Fallback urgency score based on declared urgency and keyword signals.",
    }
