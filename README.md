# Retail Radar Trends

## Documentation

https://retailradartrends-api.samiarar.com/swagger-ui

http://localhost:5000/swagger-ui

## Production

### Frontend

[Deployed on Vercel](https://retail-radar-trends.vercel.app/)

### Backend

Deployed on a VPS with nginx

#### Deploy a PROD instance

```bash
docker-compose up --build
```

## Development

run App

```bash
flask --app app --debug run
```

Interact with Alembic using flask-migrate

```bash
flask db init
```

delete data.db then run:

```bash
flask db migrate
```

Apply migration to go from the current to the latest migration version:

```bash
flask db upgrade
```

> [!WARNING]  
> **If adding column to existing model**: Check for upgrade and downgrade scripts in migrations, modify accordingly with custom queries to modify existing rows. e.g. `op.execute("UPADTE object SET new_column = False")`

### Virtual Environment

```bash
python -m venv .venv
```

```bash
docker build -t retail-radar-trends .
docker run -p 5000:5000 retail-radar-trends
```

### Hot reload

```bash
docker-compose -f docker-compose.dev.yml up --build
```

## Database

### .env

URL must start with `postgresql` not `postgres`:

- DATABASE_URL=postgresql://

### Drop Tables

> don't forget to drop this one: `DROP TABLE alembic_version`
