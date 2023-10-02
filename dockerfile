FROM node:hydrogen-alpine3.16 AS BUILDER
ENV NODE_ENV development

RUN ["mkdir", "-p", "/app"]

COPY . ./app

WORKDIR ./app

RUN npm ci
RUN npm run build

FROM nginx

ENV LISTEN_PORT=3000
ENV API_URL_INTERNAL=http://localhost:3124

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .

COPY docker-nginx.conf /etc/nginx/templates/default.conf.template
COPY configure-runtime-env.sh /docker-entrypoint.d/
COPY .env .

RUN chmod +x /docker-entrypoint.d/configure-runtime-env.sh
