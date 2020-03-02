FROM       node:12-slim as BUILD
WORKDIR    /app
COPY       package.json .
COPY       package-lock.json .
RUN        npm ci
COPY       . .
ENTRYPOINT [ "npm", "start" ]
