# syntax=docker/dockerfile:1
FROM golang:1.17-buster

WORKDIR /workspace

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

EXPOSE 8080

RUN echo "new image..."

CMD [ "go", "run", "./server" ]