FROM ubuntu:22.04

RUN mkdir /medichat-frontend
WORKDIR /medichat-frontend
EXPOSE 3000

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install wget npm -y
RUN npm cache clean -f
RUN npm install -g n
RUN n lts
RUN npm install -g npm
RUN npm i -g yarn

COPY . /medichat-frontend
RUN yarn
RUN yarn add global serve
RUN yarn build
CMD ["npx", "serve", "-s", "build"]