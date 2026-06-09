dev-backend:
	cd backend && APP_ENV=local uvicorn app.main:app --reload

dev-frontend:
	cd frontend && npm run dev

init:
	test -d backend/.venv || python3 -m venv backend/.venv
	backend/.venv/bin/pip install -r backend/requirements.txt
	cd frontend && npm install
	cd backend && APP_ENV=local alembic upgrade head

migrate:
	cd backend && APP_ENV=local alembic upgrade head

docker-up:
	docker compose up --build

docker-down:
	docker compose down
