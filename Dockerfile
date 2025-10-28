FROM node:24 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:24-alpine as app

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN apk add -t build-deps build-base python3 \
	&& npm ci \
	&& apk del --purge build-deps

COPY cli.js .
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["npm", "run", "start"]
