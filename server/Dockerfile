# Базовий образ Node.js
FROM node:16 AS build

WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY server/ .

RUN npm run dev

EXPOSE 3000

CMD ["npm", "start"]
