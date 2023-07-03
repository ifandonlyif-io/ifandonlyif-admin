FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/.output ./output

CMD [ "node", "./output/server/index.mjs" ]