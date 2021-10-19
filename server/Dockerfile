##### -- DEVELOPMENT -- #####
FROM node:14 AS development

WORKDIR /alar-users/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000


##### -- PRODUCTION -- #####
FROM node:14 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /alar-users/src/app

COPY --from=development /alar-users/src/app/ .

EXPOSE 8080

CMD ["node", "dist/main"]
