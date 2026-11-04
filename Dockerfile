FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

# Keep image lean — drop docker/build junk from the web root if present
RUN rm -f /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/docker-compose.yml \
           /usr/share/nginx/html/nginx.conf \
           /usr/share/nginx/html/.dockerignore \
  && find /usr/share/nginx/html -name '_*' -type f -delete 2>/dev/null || true

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
