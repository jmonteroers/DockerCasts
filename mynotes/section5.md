# Docker Compose with multiple local containers

## This section's goal

Build an App that shows the number of visits to the server. To do that, we need
to connect an App to a Redis server. Redis is a tiny little database that sits
inside of memory.


### First approach

Build a single container with a Node App and a Redis server. What's the issue?

If we try to scale it, how do we keep the different Redis servers connected
with each other?? It makes much more sense to use a single Redis server with
separate Docker containers for each of the apps.


### Second approach

Build separate containers for the App and the database. That's what we're going
to do in this Section!


## Introducing Docker Compose

Options for connecting containers:

- Use Docker CLI's Networking Features
  - Pain in the neck, as it involves several commands that need to be rerun every time
  - Not as much as used in industry
- Use Docker Compose
  - Separate tool
  - Used to start up multiple Docker containers
  - Automates some of the repetitive stuff needed to run `docker run`


## Docker Compose Files

- Take same commands (docker build, docker run) and write them into a `docker-compose.yml` file

- Structure:
  - container 1
    - make it using redis image
  - container 2
    - make it using the Dockerfile in the same directory
    - map one port to another

In the world of Docker compose, services is a type of a container used in a Docker compose environment.

Docker Compose automatically connects all the containers!

## Docker Compose Commands

To run docker run
```
docker-compose up
```

To run docker build + docker run. To run docker build, you need to use this command!
```
docker-compose up --build
```

## Stopping Docker Compose Containers
Run docker compose in detached mode:
```
docker-compose up -d
```

We can still use docker ps to list all running containers. To stop all containers
run by Docker Compose:
```
docker-compose down
```

## Automatic Container Restarts

In case an error is thrown, the docker container will no longer run. How can we
automatically restart it?

Error status codes
- 0: We exited and everything is K
- ELSE: an actuall error has occurred!


### Restart policies
- "no", default. Never try to restart the container if it stops/crashes
  - need to use the quotes to avoid using YML no
- always, always try to restart the container *for any reason*
  - useful for web servers
- on-failure, restart after error code
  - useful for programs that need to complete a task and then finish
- unless-stopped, always restart unless developers stop it

If on-failure, only restart if error code is non-zero!

## Container Status with Docker Compose

Similar command to `docker ps` in Docker compose:

```
docker-compose ps
```

Difference w.r.t. docker ps is that it will only show the status of the containers
specified in the docker-compose.yml in the current directory
