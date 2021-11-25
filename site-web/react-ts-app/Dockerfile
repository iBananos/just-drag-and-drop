FROM node:17.1-alpine

RUN mkdir -p /site-web/react-ts-app
WORKDIR /site-web/react-ts-app

COPY /src /site-web/react-ts-app/src
COPY /public /site-web/react-ts-app/public
COPY [^node_modules]* /site-web/react-ts-app

RUN apk --no-cache --virtual build-dependencies add python3 make g++
RUN yarn install

CMD ["yarn", "start"]