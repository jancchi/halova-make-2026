from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from app.config import settings

_client: QdrantClient | None = None


def get_qdrant() -> QdrantClient:
    global _client
    if _client is None:
        _client = QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY or None,
        )
    return _client


def ensure_collection(name: str, vector_size: int, distance: Distance = Distance.COSINE) -> None:
    """Create a Qdrant collection if it doesn't already exist."""
    client = get_qdrant()
    existing = {c.name for c in client.get_collections().collections}
    if name not in existing:
        client.create_collection(
            collection_name=name,
            vectors_config=VectorParams(size=vector_size, distance=distance),
        )
