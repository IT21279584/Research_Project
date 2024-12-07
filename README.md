# RESEARCH_PROJECT

This repository contains multiple services and machine learning models for quality classification and disease prediction in various agricultural products. Each service is organized by product type, with options to deploy using **Flask** or **Express** frameworks.

## Table of Contents

- [Project Overview](#project-overview)
- [Services](#services)
- [Folder Structure](#folder-structure)
- [High-Level Architecture](#high-level-architecture)
- [Prerequisites](#prerequisites)
- [Setup and Usage](#setup-and-usage)
  - [Running a Single Service](#running-a-single-service)
  - [Running All Services Using Docker](#running-all-services-using-docker)
- [Endpoints](#endpoints)
- [Docker Compose](#docker-compose)
- [Development and Testing](#development-and-testing)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The **RESEARCH_PROJECT** provides solutions to predict the quality of agricultural products and detect potential issues. It includes pre-trained models for the following:

- **Corn Seeds Quality Classification**
- **Egg Quality Classification**
- **Guava Quality Classification**
- **Rice Disease Prediction**
- **Soybean Seeds Quality Classification**
- **Tomato Quality Classification**

These models are deployed as microservices using Flask or Express.js for better modularity and scalability.

---

## Services

Each agricultural product has two service options:

1. **Express Service**: Developed using Node.js and Express.js, ideal for lightweight deployments.
2. **Flask Service**: Developed using Python and Flask, suitable for integrating Python-based machine learning models.

---

## Folder Structure

```plaintext
RESEARCH_PROJECT/
├── client/                             # Frontend client (if any)
├── corn-seeds-quality-classification/  # Microservice for corn seeds
│   ├── express-service/
│   ├── flask-service/
├── egg-quality-classification/         # Microservice for egg quality
│   ├── express-service/
│   ├── flask-service/
├── guava-quality-classification/       # Microservice for guava quality
│   ├── express-service/
│   ├── flask-service/
├── rice-disease-prediction/            # Microservice for rice disease
│   ├── express-service/
│   ├── flask-service/
├── soybean-seeds-quality-classification/
│   ├── express-service/
│   ├── flask-service/
├── tomato-quality-classification/      # Microservice for tomato quality
│   ├── express-service/
│   ├── flask-service/
├── docker-compose.yml                  # Docker configuration
├── .gitignore                          # Files to ignore in version control

```

## Services

### Folder Structure
Each folder corresponds to a specific agricultural product and contains the following subfolders:

- **express-service**: Implementation using Node.js and Express.js.
- **flask-service**: Implementation using Python and Flask.

### Products and Models

| Product                         | Description                      |
|---------------------------------|----------------------------------|
| **Corn Seeds**                  | Predicts seed quality.           |
| **Eggs**                        | Determines egg quality.          |
| **Guava**                       | Classifies guava quality.        |
| **Rice**                        | Detects rice diseases.           |
| **Soybean Seeds**               | Predicts seed quality.           |
| **Tomatoes**                    | Classifies tomato quality.       |

---

## High-Level Architecture

![HighLevel Digram drawio](https://github.com/user-attachments/assets/fee427d3-de7e-480c-a25d-71914d7c7186)


## Prerequisites

- **Docker**: For containerized deployment.
- **Node.js** and **npm**: For Express services.
- **Python 3.8+**: For Flask services.
- **Machine Learning Libraries**:
  - TensorFlow / PyTorch (depending on the model)
  - Scikit-learn, NumPy, Pandas (for preprocessing)
  - Additional dependencies listed in `requirements.txt`.

---

## Setup and Usage

### Running a Single Service

1. Navigate to the specific service directory:
   ```bash
   cd corn-seeds-quality-classification/express-service

2. Install dependencies:

   **For Express services:**
    ```bash
    npm install
    ```

   **For Flask services:**
    ```bash
      pip install -r requirements.txt
      
3. Start the service:

    **Express:**
     ```bash
      npm start
    ```
    **Flask:**
     ```bash
    python app.py
    ```
4. Access the service at http://localhost:<PORT>.


### Running All Services Using Docker

1. Ensure Docker is installed on your machine.
2. Build and run the services using docker-compose:
  ```bash
  docker-compose up --build
```
3. Access the services through the specified ports in docker-compose.yml.

### Docker Compose
The docker-compose.yml file allows you to run all services simultaneously in a containerized environment. Each service is mapped to its respective port.


## Endpoints

Each service exposes RESTful APIs for interaction. Below is an example for the **Corn Seeds Quality Classification** service:

### Example for Corn Seeds Quality Classification (Flask Service)

| Method | Endpoint   | Description                                |
|--------|------------|--------------------------------------------|
| POST   | `/predict` | Predict the quality of corn seeds.         |

---

## Docker Compose

The `docker-compose.yml` file facilitates running all services simultaneously in a containerized environment.

### Example Configuration

```yaml
version: "3.8"
services:
  corn-express:
    build: ./corn-seeds-quality-classification/express-service
    ports:
      - "3001:3001"
  corn-flask:
    build: ./corn-seeds-quality-classification/flask-service
    ports:
      - "5001:5001"
  ```

### Stopping the Services
To stop all running services, use the following command:
```bash
docker-compose down
