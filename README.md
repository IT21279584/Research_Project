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
├── client/                             
├── corn-seeds-quality-classification/  
│   ├── express-service/
│   ├── flask-service/
├── egg-quality-classification/         
│   ├── express-service/
│   ├── flask-service/
├── guava-quality-classification/       
│   ├── express-service/
│   ├── flask-service/
├── rice-disease-prediction/            
│   ├── express-service/
│   ├── flask-service/
├── soybean-seeds-quality-classification/
│   ├── express-service/
│   ├── flask-service/
├── tomato-quality-classification/      
│   ├── express-service/
│   ├── flask-service/
├── docker-compose.yml                  
├── .gitignore                          

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
services:
  soybean-flask-service:
    build:
      context: ./soybean-seeds-quality-classification/flask-service
    ports:
      - "5001:5001"
    networks:
      - backend

  corn-flask-service:
    build:
      context: ./corn-seeds-quality-classification/flask-service
    ports:
      - "5003:5003"
    networks:
      - backend

  
  rice-flask-service:
    build:
      context: ./rice-disease-prediction/flask-service
    ports:
      - "5009:5009"
    networks:
      - backend

  guava-flask-service:
      build:
        context: ./guava-quality-classification/flask-service
      ports:
        - "5005:5005"
      networks:
        - backend
  
  tomato-flask-service:
      build:
        context: ./tomato-quality-classification/flask-service
      ports:
        - "5007:5007"
      networks:
        - backend
  
  egg-flask-service:
    build:
      context: ./egg-quality-classification/flask-service
    ports:
      - "5011:5011"
    networks:
      - backend

  soybean-express-service:
    build:
      context: ./soybean-seeds-quality-classification/express-service
    ports:
      - "5000:5000"
    networks:
      - backend
    depends_on:
      - soybean-flask-service

  corn-express-service:
    build:
      context: ./corn-seeds-quality-classification/express-service
    ports:
      - "5002:5002"
    networks:
      - backend
    depends_on:
      - corn-flask-service
  
  rice-express-service:
    build:
      context: ./rice-disease-prediction/express-service
    ports:
      - "5008:5008"
    networks:
      - backend
    depends_on:
      - rice-flask-service

  guava-express-service:
    build:
      context: ./guava-quality-classification/express-service
    ports:
      - "5004:5004"
    networks:
      - backend
    depends_on:
      - guava-flask-service

  tomato-express-service:
    build:
      context: ./tomato-quality-classification/express-service
    ports:
      - "5006:5006"
    networks:
      - backend
    depends_on:
      - tomato-flask-service

  egg-express-service:
    build:
      context: ./egg-quality-classification/express-service
    ports:
      - "5010:5010"
    networks:
      - backend
    depends_on:
      - egg-flask-service


  client:
    build:
      context: ./client
    ports:
      - "5173:5173"
    depends_on:
      - soybean-express-service
      - corn-express-service
      - rice-express-service
      - guava-express-service
      - tomato-express-service
      - egg-express-service

    networks:
      - backend

networks:
  backend:
    driver: bridge
  ```

### Stopping the Services
To stop all running services, use the following command:
```bash
docker-compose down
