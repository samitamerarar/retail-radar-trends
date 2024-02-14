#!/bin/sh

flask db upgrade

# for DEV, use docker-compose.dev.yml instead
exec flask run --host 0.0.0.0
# for PROD, use docker-compose.yml instead
# exec gunicorn --bind 0.0.0.0:95 "app:create_app()"