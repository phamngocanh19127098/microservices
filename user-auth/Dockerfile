FROM node:12-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .

ARG DOCKER_ENV=local
ENV NODE_ENV=$DOCKER_ENV

EXPOSE 3000

CMD ["npm", "run","start:dev"]