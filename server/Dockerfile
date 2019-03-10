FROM       node:11-slim
USER       downtime
WORKDIR    /app
COPY       package.json .
RUN        npm ci
COPY       . .
ENTRYPOINT [ "npm", "start" ]
