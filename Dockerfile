# STAGE 1: The "Builder" stage

FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install --legacy-peer-deps
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build

# STAGE 2: The "Production" image
FROM node:20-alpine AS runner
# Set the working directory
WORKDIR /app
# Copy file package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production --legacy-peer-deps
# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main"]