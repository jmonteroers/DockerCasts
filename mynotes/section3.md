# Building Custom Images Through Docker Server

## Steps to create Docker images

1. Create Dockerfile
2. Use Docker Client
3. Docker Server, will do all the heavylifting for us
4. Enjoy the image! ;)

### Creating a Dockerfile
1. Specify a base image
2. Run some commands to install additional programs
3. Specify a command to run on container startup

Writing a Dockerfile is similar to being given a computer with no OS and being
told to install Chrome! What would we do?
1. Install an operating system (Step 1)
2. Start up your default browser
3. Navigate to chrome.google.com
4. Download installer
5. Run installer
6. Execute chrome.exe (Step 3)


### Building a Dockerfile
This is how we feed the Dockerfile to the Docker Client
```
docker build .
```
Why .? Because we want to present the entire current directory as the environment
for the Docker image.

### Dockerfile teardown

FROM alpine

- With capital letters, **instructions** for Docker Servers to prepare the image

FROM, RUN, and CMD are the most important instructions:
- FROM instruction, to specify Docker base image
- RUN, execute some command during preparation
- CMD, execute this command on start-up


### Choosing a Base Image

Simply choose one that makes the rest of the installation easy for you! For example,

```
FROM alpine
RUN apk add --update redis
```

apk is the package manager for alpine, that makes it very easy for us to install
redis.


### Build Process in Detail

The Build process creates an intermediate container for each step. Within each
intermediate container, it runs the appropriate command and then takes a snapshot
of its filesystem and primary command. The process is iterated till we obtain
the final image.

### Rebuild with Cache

Docker reuses some of the steps that have already been used before, giving us
much more performance in future image builds. Note that then order matters to
reuse the cached layers of your image.

Note the use of `CACHED` tags in the docker build process!

### Tagging an image

To add a tag when building an image:
```
docker build -t <docker_id>/<project_name>:<version_number> .
```
For last version, you can simply use latest.


### Docker Commit
Allows us to create an image interactively without a Dockerfile. Problem is
non-reproducibility.

Example
```
docker run -it alpine sh
...then run you commands in the terminal, leave it executing
...in another terminal
// not in Windows
docker commit -c 'CMD ["redis-server"]' <container id>
// in Windows
docker commit -c 'CMD "redis-server"' <container id>
```
The output is the ID of the new image we've created.
