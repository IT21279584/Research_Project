# Use Python base image
FROM python:3.10-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the requirements file and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the service code
COPY . .

# Expose the service's port
EXPOSE 5003

# Run the service
CMD ["python", "app.py"]
