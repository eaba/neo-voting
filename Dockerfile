FROM nginx
USER root
COPY ./out /usr/share/nginx/html
