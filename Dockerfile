FROM node:8

WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 3000
CMD yarn start
