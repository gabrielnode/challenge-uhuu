FROM node:18-alpine AS BUILDER
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn global add @nestjs/cli && yarn
COPY . .
RUN yarn build

FROM node:18-alpine AS PROD_DEPENDENCIES
WORKDIR /app
COPY --from=BUILDER /app/package.json /app/yarn.lock ./
RUN yarn --frozen-lockfile --production

FROM node:18-alpine AS runner
WORKDIR /app

RUN apk update && apk add --upgrade apk-tools && apk upgrade --available
RUN apk --no-cache add curl

USER node
COPY --from=PROD_DEPENDENCIES --chown=node:node /app/package.json /app/yarn.lock ./
COPY --from=BUILDER /app/dist ./dist
COPY --from=PROD_DEPENDENCIES --chown=node:node /app/node_modules ./node_modules

EXPOSE 3000
CMD [ "yarn", "start" ]