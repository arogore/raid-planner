FROM node:10

WORKDIR /usr/src/app

COPY client/package.json ./client/
COPY server/package.json ./server/

RUN /bin/bash -c 'cd client && npm install'
RUN /bin/bash -c 'cd server && npm install'

COPY client ./client/
COPY server ./server/

RUN /bin/bash -c 'cd client && npm run build'

EXPOSE 3132

CMD ["node", "server/src/index.js"]