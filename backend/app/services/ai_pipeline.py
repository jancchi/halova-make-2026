import json
import logging

from vertexai.generative_models import GenerationConfig, GenerativeModel


MODEL_NAME = "gemini-2.0-flash-001"


logger = logging.getLogger(__name__)


SYSTEM_INSTRUCTION = """You are an operations analyst for a startup and VC ecosystem community.
Analyze incoming support requests and return structured JSON only.

Categories (pick exactly one):
INVESTOR_INTRO, HIRING, SPEAKING_OPPORTUNITY, MARKETING_SUPPORT,
SALES_SUPPORT, PARTNERSHIP, PRODUCT_FEEDBACK, LEGAL_FINANCE, OPERATIONS, OTHER

Member roles (return 1-3 that are most relevant):
STARTUP_FOUNDER, INVESTOR, SERVICE_PROVIDER, ECOSYSTEM_PARTNER, MENTOR

Priority rules:
- Score 8-10: urgent timing, fundraising runway, critical hire, high ecosystem leverage
- Score 5-7: clear actionable ask, moderate urgency
- Score 1-4: vague ask, low detail, low urgency"""


RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "category": {"type": "string"},
        "priority_score": {"type": "integer"},
        "priority_reasoning": {"type": "string"},
        "summary": {"type": "string"},
        "required_member_roles": {
            "type": "array",
            "items": {"type": "string"},
        },
    },
    "required": [
        "category",
        "priority_score",
        "priority_reasoning",
        "summary",
        "required_member_roles",
    ],
}


class AIPipelineError(Exception):
    pass


def analyze_request(*, company_name: str, web_url: str, description: str) -> dict:
    model = GenerativeModel(MODEL_NAME, system_instruction=SYSTEM_INSTRUCTION)

    user_message = (
        f"Company: {company_name}\nWebsite: {web_url}\nRequest: {description}"
    )

    try:
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
        return json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise ValueError("AI returned malformed response") from exc
