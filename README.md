# Retail Radar Trends

## Development

```bash
flask --app app --debug run
```

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
docker-compose up --build
```

## Documentation

http://localhost:5000/swagger-ui
