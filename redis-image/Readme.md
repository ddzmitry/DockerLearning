> docker build .   (with base alpine image)
```
cd redis-image
# build context 
docker build .
# at first it will look into cache  and if it not there it will go and download  it
```
> Check out 
```
Sending build context to Docker daemon  3.072kB
Step 1/3 : FROM alpine
 ---> 5cb3aa00f899
Step 2/3 : RUN apk add --update redis
 ---> Using cache
 ---> bed9bbdfdefa
Step 3/3 : CMD [ "redis-server" ]
 ---> Using cache
 ---> 24101d49465d
Successfully built 24101d49465d
Dzmitrys-MBP:redis-image dzmitrydubarau$ docker run 24101d49465d
```
> Temporary id 
```
Step 1/5 : FROM alpine
 ---> 5cb3aa00f899  => can access as intermediate container 
Step 2/5 : RUN apk add --update redis
 ---> Using cache
 ---> bed9bbdfdefa  => can access as intermediate container 
Step 3/5 : RUN apk add --update vim
 ---> Using cache
 ---> 2a5b34f54cde => can access as intermediate container 
Step 4/5 : RUN apk add --update python3
 ---> Running in ac84f3634bf5
 ```
 > Result we have container with our own filesystem

Dzmitrys-MBP:redis-image dzmitrydubarau$ docker create ecc20707980a
cb8cb5bfd43fa6f43c71ede9bb9ca512e54d6df0355df0f8fad96a7dd02f6d6b

> RUN Container docker run ecc20707980a