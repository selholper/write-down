# Use Node.js as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json files for both client and server
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install python3 for node
RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python

# Install dependencies for client
WORKDIR /app/client
RUN npm install

# Install dependencies for server
WORKDIR /app/server
RUN npm install

# Copy source code for both applications
WORKDIR /app
COPY client ./client
COPY server ./server

# Set the working directory back to the root
WORKDIR /app

# Expose ports for client and server
EXPOSE 3000 3002

# Inststall concurrently library to run server and client simultaneously
RUN npm install -g concurrently

# Start both applications using concurrently
# We use --kill-others so if one process exits, all processes are terminated
CMD ["concurrently", "--kill-others", "cd client && npm start", "cd server && npm start"]
