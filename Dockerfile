FROM python:3.10

# EXPOSE 5000 # gunicorn runs on port 80, but i've specified 95 in the .sh file

WORKDIR /app

COPY ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

CMD ["/bin/bash", "docker-entrypoint.sh"]
