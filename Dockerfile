FROM nginx:1.21.6
WORKDIR /usr/share/nginx/html/constructor
COPY static/ .
RUN mv constructor.html index.html
