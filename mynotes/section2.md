# Manipulating Containers with Docker

## Docker run in detail
What occurs when we execute `docker run hello-world`?

- The filesystem snapshot is copied into the Hard drive segment for this process
 (using cgroups too to limit the amount of resources allocated to this process)

- Then use the Startup command to have the process running in this segment.

Identical to running:
```
docker run = docker create + docker start
```
### Overriding default commands

To override the default startup command you can provide it in the following way:
```
docker run <image name> command!
```

Example:
```
docker run busybox echo hi there
```
where `echo hi there` is the new startup command.


More useful example. Run `busybox` and then ls all folders in root folder in container:
```
docker run busybox ls
```

But what if we tried?
```
docker run hello-world ls
```
We get an error claiming that ls is not available. The reason is that we can only use
commands available in the Image FS snapshot.

How to start program with a Shell:
```
docker run -it busybox sh
```

The key is the it flag to attach our STDIN in a nicely formatted way. The downside is that
we won't be running any other process in our container.

To run container in detached mode
docker run -d <container name>


## Listing all running containers
docker ps

If no running containers, then we'll just get the headers of a table. To see some
entries in this table, we can change the startup command:
```
docker run busybox ping google.com
```
and now running docker ps, we get:
```
CONTAINER ID   IMAGE     COMMAND             CREATED         STATUS         PORTS     NAMES
c2f0439aa4c7   busybox   "ping google.com"   5 seconds ago   Up 3 seconds             sad_dirac
```

To see all docker containers that have been run on our computer:
```
docker ps --all
```
To remove stopped containers,
```
docker system prune
```
Notice that this command will remove all the images from the build cache.

## Docker lifecycle
```
$ docker create hello-world
 <returns container id>
$ docker start -a docker_container_id
```
The a flag is necessary to attach the shell, so that we connect the output of
the container in our shell. `docker start` can be used to restart a container!

When restarting a container, you **can't** change the start-up command.

### Retrieving Log Outputs
How do you get output from a container being run with `docker start container_id`?

We can get the logs of this container by using:
```
docker logs <container id>
```

#### Example
```
docker create busybox echo hi there
docker start <container id>
docker log <container id>
```

### Stop container

- Stop a container: `docker stop container_id`. Sends SIGTERM to shut down in its
own time, after some cleanup

- Kill a container: `docker kill container_id`. Sends SIGKILL, which means stopping
RIGHT NOW.


## Multi-command containers

To run another command within an already running container, we can use the command:
```
docker exec -it <container_id> <command>
```
Without the `it` flag, we would just some text output back.

### Understanding the IT Flag

All Linux processes have three ways to handle I/O: STDIN, STDOUT, and STDERR. The
-it flag is actually equivalent to -i -t. The meaning of each of these tags is:

-i flag: Attach our terminal to STDIN of the process
-t: Its most important effect is to present some nicely formatted input and output
for us to interact with.

### Run Shell in container
```
docker exec -it <container_id> sh
```


## Container Isolation
Several containers have completely separated filesystems, even if they run from
the same images!
