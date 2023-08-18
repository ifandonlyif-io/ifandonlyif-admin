FROM node:18-bookworm AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y git unzip
RUN wget https://github.com/oven-sh/bun/releases/download/bun-v0.7.3/bun-linux-aarch64.zip &&\
  unzip bun-linux-aarch64.zip && chmod +x ./bun-linux-aarch64/bun

RUN chmod +x ./bun-linux-aarch64/bun
COPY package.json package-lock.json ./
RUN ./bun-linux-aarch64/bun --smol install
COPY . .
RUN NODE_OPTIONS=--max_old_space_size=700 ./bun-linux-aarch64/bun --smol run build
# RUN NODE_OPTIONS=--max_old_space_size=850 npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.output ./output

CMD [ "node", "./output/server/index.mjs" ]