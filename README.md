# Retail Radar Trends

## Development

flask --app app --debug run

### Virtual Environment

python -m venv .venv

docker build -t retail-radar-trends .
docker run -p 5005:5000 retail-radar-trends
