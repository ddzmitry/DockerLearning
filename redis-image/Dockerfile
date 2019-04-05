# Use an existing docker image as base 
FROM alpine
# Download and install dependencies
RUN apk add --update redis
# Install Vim 
RUN apk add --update vim
# Install Python 3 
RUN apk add --update python3
# Imstall GCC
RUN apk add --update gcc
# Tell image what to do when it starts as container 
CMD [ "redis-server" ]
