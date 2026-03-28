.PHONY: install dev-backend dev-frontend dev migrate format clean

# ── Setup ─────────────────────────────────────────────────────────────────────
install:
	@echo ">>> Installing backend deps..."
	cd backend && pip install -r requirements.txt
	@echo ">>> Installing frontend deps..."
	cd frontend && npm install

# ── Dev servers ───────────────────────────────────────────────────────────────
dev-backend:
	cd backend && uvicorn main:app --reload --port 8000

dev-frontend:
	cd frontend && npm run dev

dev:
	@echo ">>> Starting backend on :8000 and frontend on :3000"
	$(MAKE) dev-backend & $(MAKE) dev-frontend

# ── DB ────────────────────────────────────────────────────────────────────────
migrate:
	cd backend && python -c "from app.database import create_db_and_tables; create_db_and_tables(); print('Tables created.')"

# ── Code quality ──────────────────────────────────────────────────────────────
format:
	cd backend && black . && isort .

# ── Cleanup ───────────────────────────────────────────────────────────────────
clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -name "*.pyc" -delete
	rm -rf frontend/.nuxt frontend/.output
