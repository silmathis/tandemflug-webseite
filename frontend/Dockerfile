# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/. ./
COPY Bilder /app/Bilder

RUN npm run build

# Runtime Stage
FROM node:20-alpine

WORKDIR /app/frontend

# Install serve to serve the built app
RUN npm install -g serve

# Copy built assets from builder
COPY --from=builder /app/frontend/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]