FROM python:3.10

# EXPOSE 5000 # gunicorn runs on port 80, but i've specified port 95 in .sh and docker-compose

WORKDIR /app

COPY ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

CMD ["/bin/bash", "docker-entrypoint.sh"]
