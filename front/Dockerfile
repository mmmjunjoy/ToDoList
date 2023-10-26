# FROM node:14.5-alpine AS build
FROM node:14.21-alpine

COPY . /app
WORKDIR /app

RUN npm update && npm install &&  npm install -g @angular/cli


EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
