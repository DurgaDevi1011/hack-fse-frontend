FROM node:latest

COPY package*.json ./

WORKDIR /src

RUN npm install --production

EXPOSE 3000

CMD ng serve
