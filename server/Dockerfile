# Встановлюємо базовий образ Node.js
FROM node:20

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY server/package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли проекту в контейнер
COPY server/ ./

# Встановлюємо глобально ts-node для виконання TypeScript без попередньої компіляції
RUN npm install -g ts-node

# Відкриваємо порт
EXPOSE 3000

# Запускаємо сервер через ts-node (для TypeScript)
CMD ["ts-node", "index.ts"]
