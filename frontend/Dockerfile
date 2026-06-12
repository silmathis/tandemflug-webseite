FROM node:20-alpine

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/. ./
COPY Bilder /app/Bilder

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]