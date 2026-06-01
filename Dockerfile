FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json .npmrc ./
COPY prisma ./prisma
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
