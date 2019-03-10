FROM       node:11-slim
USER       nodeauth
WORKDIR    /app
COPY       package.json .
RUN        npm ci
COPY       . .
ENTRYPOINT [ "npm", "start" ]
