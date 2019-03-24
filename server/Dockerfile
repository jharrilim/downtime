FROM       node:11-slim as BUILD
WORKDIR    /app
COPY       package.json .
COPY       package-lock.json .
RUN        npm ci
COPY       . .
RUN        npm run build

FROM       node:11-slim as RUNTIME
WORKDIR    /app
RUN        npm i -g reflect-metadata
COPY       --from=BUILD /app/dist .
ENTRYPOINT [ "node", "." ]
