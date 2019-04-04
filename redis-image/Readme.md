```
cd redis-image
docker build .
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