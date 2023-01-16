FROM node:19 AS installer
WORKDIR /app
COPY . .
RUN rm -rf node_modules
RUN npm install --legacy-peer-deps
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:debug"]