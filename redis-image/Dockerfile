# Use an existing docker image as base 
FROM alpine
# Download and install dependencies
RUN apk add --update redis
RUN apk add --update vim
# Tell image what to do when it starts as container 
CMD [ "redis-server" ]
