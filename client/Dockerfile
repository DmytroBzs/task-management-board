
FROM node:16 AS build

WORKDIR /app

COPY client/package*.json ./

RUN npm install

COPY client/ .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
