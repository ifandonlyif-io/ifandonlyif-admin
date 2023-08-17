FROM oven/bun:0.7.1 AS deps

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY package.json package-lock.json ./

RUN bun --smol install

FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN NODE_OPTIONS=--max_old_space_size=1024 npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.output ./output

CMD [ "node", "./output/server/index.mjs" ]