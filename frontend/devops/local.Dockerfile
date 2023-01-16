FROM node
WORKDIR /app
COPY package.json .
RUN npm install -g npm@9.3.0
RUN npm config set legacy-peer-deps true
RUN npm i
COPY . .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 5173
CMD ["npm", "run", "dev"]