FROM node:17.1.0

RUN mkdir -p /backend
RUN mkdir -p /site-web/react-ts-app

COPY /backend/src /backend/src
COPY /backend/certificate /backend/certificate
COPY /backend/uploads /backend/uploads
COPY /backend/python_script /backend/python_script
COPY /backend/[^node_modules]* /backend

COPY /site-web/react-ts-app/src /site-web/react-ts-app/src
COPY /site-web/react-ts-app/public /site-web/react-ts-app/public
COPY /site-web/react-ts-app/[^node_modules]* /site-web/react-ts-app


RUN apt-get update && apt-get install python3.8 python3.8-pip -y
RUN pip install -r /backend/python_script/requirements.txt

RUN cd /backend && npm install
RUN cd /site-web/react-ts-app/ && npm install && npm run build
RUN ln -s /usr/bin/python3 /usr/bin/python


WORKDIR /backend
CMD ["npm", "run", "dev"]