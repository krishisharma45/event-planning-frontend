# syntax=docker/dockerfile:1

FROM node:12-slim

WORKDIR /workspace

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]