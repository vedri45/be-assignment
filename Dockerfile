# Use slim node image for smaller footprint
FROM node:16-slim

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Set working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
