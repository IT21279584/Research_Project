# Stage 1: Build Dependencies
FROM python:3.10-slim AS builder

# Install necessary build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements file first for better caching
COPY requirements.txt ./

# Pre-build wheels for faster installation
RUN pip wheel --no-cache-dir --wheel-dir=/wheels -r requirements.txt

# Stage 2: Runtime
FROM python:3.10-slim

# Copy only necessary files to minimize final image size
COPY --from=builder /wheels /wheels
RUN pip install --no-cache-dir --find-links=/wheels -r /wheels/requirements.txt

WORKDIR /app
COPY . .

EXPOSE 5003

CMD ["python", "app.py", "--host=0.0.0.0"]