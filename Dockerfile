FROM node:22 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN curl -fsSL https://bun.sh/install | BUN_INSTALL=/usr bash
COPY *.lock* ./
COPY patches/ patches/
RUN bun install
COPY ./public/nextra-page-map.mjs ./.next/static/chunks/nextra-page-map-.mjs 
COPY . .
RUN yarn build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/out /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
