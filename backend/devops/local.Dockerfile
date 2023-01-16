FROM node:16-alpine AS base
RUN apk update && apk add --upgrade apk-tools && apk upgrade --available
RUN apk add bash
RUN yarn global add @nestjs/cli
WORKDIR /app
COPY --chown=node:node . .
RUN mkdir dist
RUN chown -R node ./dist
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
EXPOSE 3000 9229
USER node
CMD ["yarn", "start:debug" ]