# syntax=docker/dockerfile:1
FROM node:12-slim

WORKDIR /workspace

RUN npm install -g nodemon

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "nodemon", "start" ]