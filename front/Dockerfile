FROM node:16
WORKDIR /app
RUN npm install -g serve

RUN mkdir ./build
COPY ./build ./build

EXPOSE 3000
ENTRYPOINT ["serve", "-s", "build"]
