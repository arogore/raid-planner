FROM node:10

WORKDIR /usr/src/app

COPY server/package.json ./

RUN /bin/bash -c 'npm install'

COPY server ./server/

EXPOSE 80

CMD ["node", "server/src/index.js"]