# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Prisma CLI globally
RUN npm install -g prisma

# Generate Prisma client
RUN npx prisma generate

# Expose the application port
EXPOSE 3000


USER node

# Start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]