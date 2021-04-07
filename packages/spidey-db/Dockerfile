FROM alpine:3.13

RUN set -eux; \
  \
    apk add --no-cache --virtual .build-deps \
    git \
    coreutils \
    dpkg-dev dpkg \
    linux-headers \
    musl-dev \
    gcc \
    make; \
  \
  mkdir -p /usr/src; \
  cd /usr/src; \
  git clone https://github.com/kubejm/spidey-db.git; \
  cd spidey-db; \
  make; \
  mv ./build/spidey-db /usr/local/bin/spidey-db; \
  cd /; \
  rm -rf /usr/src; \
  apk del --no-network .build-deps; \
  which spidey-db

EXPOSE 6425
CMD ["spidey-db"]
