FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY src ./src

RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY package*.json ./

RUN npm ci --only=production && \
    npm cache clean --force

COPY --from=builder /app/build ./build

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 2567

ENV NODE_ENV=production
ENV PORT=2567

CMD ["node", "build/index.js"]

