FROM nginx:1.21.0-alpine

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY njs /etc/nginx/njs
COPY nginx.conf /etc/nginx