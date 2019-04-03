####Learning Docker 

#####_Installation_

> download at https://hub.docker.com/editions/community/docker-ce-desktop-mac

> Using Docker Client (docker run hello-world)
> Docker is running Linux 

#####_Docker Client_
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

