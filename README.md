# Starterpack

Минимальный стартовый набор с разделением на `frontend` и `backend`.

## Структура

- `frontend/` — заготовка под фронтенд
- `backend/` — FastAPI + SQLAlchemy + Alembic
- `Dockerfile` — сборка бэкенда из корня проекта
- `docker-compose.yml` — запуск `api` + `db` (PostgreSQL)

## Локальный запуск backend без Docker (SQLite)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
APP_ENV=local alembic upgrade head
APP_ENV=local uvicorn app.main:app --reload
```

Проверка:

- `GET http://127.0.0.1:8000/api/health`
- `GET http://127.0.0.1:8000/api/notes/`

## Docker запуск backend + PostgreSQL

```bash
docker compose up --build
```

Проверка:

- `GET http://127.0.0.1:8000/api/health`
- `GET http://127.0.0.1:8000/api/notes/`

## Переменные окружения backend

Файлы:

- `backend/.env.local` — локальный режим (SQLite)
- `backend/.env.docker` — docker-режим (PostgreSQL)
- `backend/.env.example` — шаблон

Ключи:

- `APP_ENV=local|docker`
- `DATABASE_URL=` (если пусто, выбирается по `APP_ENV`)
- `DB_ECHO=false`
