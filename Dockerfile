FROM oven/bun:0.7.1 AS builder

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY package.json package-lock.json ./

RUN bun --smol install

COPY . .

RUN bun run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.output ./output

CMD [ "node", "./output/server/index.mjs" ]