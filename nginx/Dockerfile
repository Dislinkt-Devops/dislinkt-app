FROM opentracing/nginx-opentracing

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY njs /etc/nginx/njs
COPY nginx.conf /etc/nginx
COPY jaeger-config.json /etc/jaeger-config.json