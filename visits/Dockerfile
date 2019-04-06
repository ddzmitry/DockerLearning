FROM node:alpine
# Sert WDIR
WORKDIR '/app'

COPY package.json .

RUN npm install

COPY . .

cmd ["npm","start"]