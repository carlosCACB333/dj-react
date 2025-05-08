FROM node:22-alpine AS node-image


# development stage

FROM node-image AS base
RUN yarn global add bun

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["bun", "run", "dev"]


# production stage


FROM base AS builder
ARG VITE_API_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build


FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]