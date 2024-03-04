FROM python:3.11

RUN mkdir "app"

WORKDIR /app

COPY requirements.txt requirements.txt

RUN  pip install --upgrade pip && pip install -r requirements.txt && pip install prometheus-fastapi-instrumentator && pip install --upgrade 'sentry-sdk[fastapi]'


COPY ./backend .

CMD ["hypercorn", "main:app", "--bind", "0.0.0.0:3000", "--reload"]

