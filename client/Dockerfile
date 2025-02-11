# Використовуємо базовий образ Node.js 20
FROM node:20 AS build

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY client/package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли проекту
COPY client/ ./

# Виконуємо збірку
RUN npm run build

# Відкриваємо порт (залежить від конфігурації Vite)
EXPOSE 5173

# Запускаємо сервер для preview
CMD ["npm", "run", "preview"]
