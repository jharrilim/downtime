mkdir -p /etc/certs

openssl req \
    -subj "/C=CA/ST=Ontario/L=Toronto/O=Downtime/CN=johali.me" \
    -newkey rsa:4096 \
    -new \
    -nodes \
    -x509 \
    -days 3650 \
    -keyout /etc/certs/downtime-key.pem \
    -out /etc/certs/downtime-cert.pem

chmod 400 /etc/certs/downtime-{key,cert}.pem

chown root:root /etc/certs/downtime-{key,cert}.pem