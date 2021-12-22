# syntax=docker/dockerfile:1
FROM golang:1.17-buster

WORKDIR /workspace

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

CMD [ "go", "run", "./server" ]