# All refered to builder phase
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY  . .
RUN npm run build

FROM nginx
# Copy from builder phase
# https://hub.docker.com/_/nginx
COPY --from=builder /app/build /usr/share/nginx/html
# Default command will start nginx for us 
# 8080:80
