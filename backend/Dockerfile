FROM node:17.1-alpine

RUN mkdir -p /backend
WORKDIR /backend

COPY /src /backend/src
COPY [^node_modules]* /backend

RUN apk --no-cache --virtual build-dependencies add python3 make g++
RUN rm -rf node_modules
RUN npm install

CMD ["npm", "run", "dev"]

