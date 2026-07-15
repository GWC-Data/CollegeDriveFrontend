# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build the Vite application
RUN npm run build

# Production Stage
FROM node:20-alpine

WORKDIR /app

# Install static file server
RUN npm install -g serve

# Copy built files
COPY --from=builder /app/dist ./dist

ENV PORT=8080

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]