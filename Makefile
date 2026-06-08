dev-backend:
	cd backend && APP_ENV=local uvicorn app.main:app --reload

dev-frontend:
	cd frontend && npm run dev

migrate:
	cd backend && APP_ENV=local alembic upgrade head

docker-up:
	docker compose up --build

docker-down:
	docker compose down
