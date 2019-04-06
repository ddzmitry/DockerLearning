#### Learning Docker 

##### _Installation_

> download at https://hub.docker.com/editions/community/docker-ce-desktop-mac

> Using Docker Client (docker run hello-world)
> Docker is running Linux 

##### _Docker Client_
> `docker run <image name>`
> `docker run busybox ls -la` (will show folders that inside of container)

```bash
drwxr-xr-x    1 root     root          4096 Apr  2 02:49 .
drwxr-xr-x    1 root     root          4096 Apr  2 02:49 ..
-rwxr-xr-x    1 root     root             0 Apr  2 02:49 .dockerenv
drwxr-xr-x    2 root     root         12288 Feb 14 18:58 bin
drwxr-xr-x    5 root     root           340 Apr  2 02:49 dev
drwxr-xr-x    1 root     root          4096 Apr  2 02:49 etc
drwxr-xr-x    2 nobody   nogroup       4096 Feb 14 18:58 home
dr-xr-xr-x  220 root     root             0 Apr  2 02:49 proc
drwx------    2 root     root          4096 Feb 14 18:58 root
dr-xr-xr-x   13 root     root             0 Apr  2 02:49 sys
drwxrwxrwt    2 root     root          4096 Feb 14 18:58 tmp
drwxr-xr-x    3 root     root          4096 Feb 14 18:58 usr
drwxr-xr-x    4 root     root          4096 Feb 14 18:58 var

```
>`docker ps` (will show processes)
>`docker run busybox ping google.com`
>`docker ps --all` (list all containers ever created)
>`docker run` = docker create + docker run

```bash
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker create hello-world
ce8ba6a155a7b05039bc622193c9c9f3fbdadcd3a2940f3079efabd25a14b85c
```
```bash
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker start -a ce8ba6a155a7b05039bc622193c9c9f3fbdadcd3a2940f3079efabd25a14b85c
Hello from Docker!
This message shows that your installation appears to be working correctly.
```



```
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker ps --all
CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS                          PORTS               NAMES
27e32ac374d5        busybox             "echo hi there"     About a minute ago   Exited (0) About a minute ago                       mystifying_ramanujan
```
> and run it again 
```
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ `docker start -a 27e32ac374d5`
hi there
```
Remove images and clean cache
```
docker system prune
Deleted Containers:
27e32ac374d5965728944ea2498bc30abbf811a78333db47e088db87558786a7
ce8ba6a155a7b05039bc622193c9c9f3fbdadcd3a2940f3079efabd25a14b85c
9df34475bf703a4af3d310f4e4f6276a7b7689d8a270e59251d2898fc3bd6e63
f81824aa60a2c5cd970f10733b947f750832d6715c9caacb50493835aa31bf16
30bdf81b7d37a95f901318694fb983f85e2329a9f8295085ec0d26d5e6571856
b9befc197b83d05e023d8a5bfa73f059aa24c8f04d3927f6fb41fdaf001a9fdb
4dc24c1393751801042af14277f60f5ab4d279bc58e7469e71fccd20bd47959c
```

> Docker check logs (see output of the image)
```
> docker create busybox echo hi there 
547bb7cdd56bca224f8b5002d084da714be70cb4c691633efff1afe0e0b072fd
> docker start -i 547bb7cdd56bca224f8b5002d084da714be70cb4c691633efff1afe0e0b072fd
> docker logs 547bb7cdd56bca224f8b5002d084da714be70cb4c691633efff1afe0e0b072fd
hi there
```
```
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker create busybox ping google.com
7034876b226884068315e72f45de6cb91538b9938324208b9c8c78c0fceb2c83

Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
7034876b2268        busybox             "ping google.com"   2 minutes ago       Up 2 seconds                            practical_rosalind

```
> To stop a container that starts on its own
```
docker stop <PID>  (will stop on its own time)
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker stop 7034876b2268
7034876b2268

docker kill <PID> (will just destroy container without feedback)
```
> Running Images and using in containers
```
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker run redis
```
> Execute additional command to container 
```
docker exec -it <conteiner id> <command>
```
> Check for process ID
```
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
b5fce8ed7452        redis               "docker-entrypoint.s…"   6 minutes ago       Up 6 minutes        6379/tcp            jolly_pike
```
> Execute commands on ID
```
docker exec -it b5fce8ed7452 redis-cli
127.0.0.1:6379> SET myvalue 5
OK
127.0.0.1:6379> get myvalue
"5"
```
> Common thing is to get shell acces without having to run `docker exec` *now we have root yay*
```
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker exec -it b5fce8ed7452 sh
# whoami
root
```
> Also can get shell on box (but it will notl oad layers)
```
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker run -it busybox sh
```
> Containers are not sharing filesystem by default

### Creating own image 

> Flow 
```
1) Specify base image 
2) Run some commands to install additional programs
3) Specify a command to run on container startup
```
> First Image Build (checl redis-image Readme)

> Building with cache (added *RUN apk add --update gcc*) => docker build .
```
Step 1/6 : FROM alpine
 ---> 5cb3aa00f899
Step 2/6 : RUN apk add --update redis
 ---> Using cache
 ---> bed9bbdfdefa
Step 3/6 : RUN apk add --update vim
 ---> Using cache
 ---> 2a5b34f54cde
Step 4/6 : RUN apk add --update python3
 ---> Using cache
 ---> 74feffedb617
Step 5/6 : RUN apk add --update gcc
 ---> Running in 00bf73895f0e
fetch http://dl-cdn.alpinelinux.org/alpine/v3.9/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.9/community/x86_64/APKINDEX.tar.gz
(1/10) Installing binutils (2.31.1-r2)
(2/10) Installing gmp (6.1.2-r1)
(3/10) Installing isl (0.18-r0)
(4/10) Installing libgomp (8.2.0-r2)
(5/10) Installing libatomic (8.2.0-r2)
(6/10) Installing libgcc (8.2.0-r2)
(7/10) Installing mpfr3 (3.1.5-r1)
(8/10) Installing mpc1 (1.0.3-r1)
(9/10) Installing libstdc++ (8.2.0-r2)
(10/10) Installing gcc (8.2.0-r2)
OK: 183 MiB in 38 packages
Removing intermediate container 00bf73895f0e
 ---> be60f5a8ab90
Step 6/6 : CMD [ "redis-server" ]
 ---> Running in 0a0cc73057a8
Removing intermediate container 0a0cc73057a8
 ---> ecc20707980a
```
> RUN Container `docker run ecc20707980a`

> To name own way container 
```
docker build -t dzmitry/redis:latest .
```
> docker run dzmitry/redis:latestdocker create 

#### Manual Image Generation with Docker  (Not recommended better use Dockerfile)
> Run image
```
Dzmitrys-MBP:redis-image dzmitrydubarau$ docker run -it alpine sh
```
> Install Redis
```
apk add redis --update
```
> Take a snapshot of container
```
Dzmitrys-MBP:DockerLearning dzmitrydubarau$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
b8f5417a1ac3        alpine              "sh"                2 minutes ago       Up 2 minutes                            confident_bardeen
```
> Register Container 
```
docker commit -c 'CMD ["redis-server"]' b8f5417a1ac3

sha256:72f98b5245a9aa0ac1fb12345b52d6fc6181ccceacd4046e1c15b53a592a46f2
```
> Running container we dont have to memorize full hash ()
```
docker run 72f98b5245a9aa0a

1:M 05 Apr 03:17:49.357 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
1:M 05 Apr 03:17:49.357 * Ready to accept connections
```

#### Project Outline (Node JS Web app `/simpleweb folder`)
> To Copy (PATH is relative to `build .` context)
```
COPY package.json /tmp/package.json
```
> Build custom name
```
docker build -t dzmitry/simpleweb .
```
> To Open Port for incomming requests (Docker can make outcoming requests on it's own)
```
docker run -p 8080:8080 dzmitry/simpleweb
docker run -p 5000:8080 dzmitry/simpleweb
5000 is localhost
```
> Use exec 
```
docker run -p 8080:8080 dzmitry/simpleweb
```
> Get Container id 
```
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                    NAMES
1a3fe53a4213        dzmitry/simpleweb   "npm start"         33 seconds ago      Up 32 seconds       0.0.0.0:8080->8080/tcp   loving_ramanujan
```
> Execute custom command (since WORKDIR specified it will automatically redirect there )
```
docker exec -it 1a3fe53a4213 sh
/usr/app # pwd
/usr/app
```
> Avoid reinstall on every time when content changes
```
# ONLY Package.json
COPY ./package.json ./
# Install dependencies 
RUN npm install
```