# Stage 1: Build
FROM python:3.10-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Stage 2: Runtime
FROM python:3.10-slim

COPY --from=builder /install /usr/local
WORKDIR /app
COPY . .

EXPOSE 5001
CMD ["python", "app.py", "--host=0.0.0.0"]

