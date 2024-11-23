# Use Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the service code
COPY . .

# Expose the service's port
EXPOSE 5002

# Run the service
CMD ["npm", "start"]
