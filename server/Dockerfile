
FROM node:20

WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY server/ ./

RUN npm install -g ts-node

EXPOSE 3000

CMD ["ts-node", "index.ts"]
