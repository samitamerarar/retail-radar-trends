#!/bin/sh

flask db upgrade

# exec flask run --host 0.0.0.0
exec gunicorn --bind 0.0.0.0:95 "app:create_app()"