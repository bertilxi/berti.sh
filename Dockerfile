# syntax = docker/dockerfile:1

FROM node:20-slim

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

COPY --link . .

RUN npm ci

ENV NODE_ENV="production"

EXPOSE 8080

CMD npx tsx main.ts