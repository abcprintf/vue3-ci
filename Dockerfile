FROM nginx:1.23-alpine

WORKDIR /app

COPY ./dist .

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]