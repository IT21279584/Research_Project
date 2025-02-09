# Use Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --no-cache

# Install bash
RUN apk add --no-cache bash

# Copy the service code
COPY . .

# Expose the service's port
EXPOSE 5012

# Run the service
CMD ["npm", "start"]
