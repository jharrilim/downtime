FROM    node:11.12.0 as build
WORKDIR /app
COPY    package.json .
COPY    package-lock.json .
RUN     npm ci
COPY    . .
RUN     npm run build

FROM    nginx:stable-alpine
COPY    --from=build /app/build /usr/share/nginx/html
