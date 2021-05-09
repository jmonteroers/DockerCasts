# Real Project Example with Docker

Goal: Tiny Node JS Web App, then access this app on our local machine.

1. Create Node JS web app
2. Create a Dockerfile
3. Build image from Dockerfile
4. Run image as container
5. Connect to web app from a browser


## Commands needed to run Node JS

- npm install, to install dependencies
- npm start, to start the server

Both of them assume that npm (node package manager) is installed!

## Choosing the right base image

Alpine is typically used in Docker to get an OS as small as possible. So typically,
it's interesting to check for alpine versions.


## Copying Build Files
No files in your current building directory are copied to the Container FS by default.

To add these files, you need to use the instruction
COPY <path to src folder relative to building context> <dest path inside the container>

The build context is specified in the docker build command as:
```
docker build <build context>
```


## Container Port Mapping
A port mapping takes the incoming requests to port 8080 and maps to the 8080 port in
your container. In order to set this mapping, we need to make an adjustment to
the docker run command.
```
docker run -p <incoming requests to this port on local host to...>:<this port inside the container> <image name>
```
Note the colon between the port on local PC and the port in the container


## Specifying a Working Directory
