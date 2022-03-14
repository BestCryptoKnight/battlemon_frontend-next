FROM nginx:1.21.6
COPY static/constructor/ /usr/share/nginx/html/constructor/
COPY static/constructor.html /usr/share/nginx/html/index.html