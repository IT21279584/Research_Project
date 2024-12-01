# Use a specific Node.js LTS version
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --no-cache

# Copy the rest of the application
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port that Vite runs on
EXPOSE 5173

# Run the Vite app
CMD ["npm", "run", "dev"]
