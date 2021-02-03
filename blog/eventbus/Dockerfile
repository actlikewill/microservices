FROM node:alpine

LABEL application="eventbus-service"

ENV APP_HOME="/home/app"

WORKDIR ${APP_HOME}

RUN apk update && apk upgrade

RUN npm install -g yarn --force

COPY yarn.lock ${APP_HOME}

COPY package.json ${APP_HOME}

RUN yarn install

COPY . ${APP_HOME}

CMD ["yarn", "start"]