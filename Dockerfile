FROM python:3.11-alpine

COPY ./backend/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt
RUN apk update
RUN apk add git

COPY ./backend/*.py /app/
COPY ./frontend/build/ /app/frontend/

CMD [ "python", "main.py" ]
