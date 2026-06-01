FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json .npmrc ./
COPY prisma ./prisma
RUN npm ci

COPY . .
RUN npx prisma generate

ENV NEXT_TELEMETRY_DISABLED=1

RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" \
  BETTER_AUTH_SECRET="build-time-placeholder-secret-000000000000" \
  BETTER_AUTH_URL="http://localhost:3000" \
  ABUSE_HASH_SECRET="build-time-placeholder-abuse-0000000000000" \
  USE_MOCK_AI="true" \
  ENABLE_EMAIL="false" \
  ENABLE_BILLING="false" \
  npm run build
RUN cp -r public .next/standalone/public && \
  cp -r .next/static .next/standalone/.next/static

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
