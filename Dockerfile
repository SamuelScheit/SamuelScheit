FROM node:16 as builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
RUN yarn export

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/out /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
