# Section 1. Dive Into Docker!
## Why Docker?
It makes it easy to install and run programs!

## What is Docker?
Docker is an entire software ecosystem, consisting of at least the following projects:

- Docker Client
- Docker Server
- Docker Machine
- Docker Images
- Docker Hub
- Docker Compose

This ecosystem is designed to run containers.

### What is a container?
The command `docker run reddis` leads to a number of actions. The docker CLI reaches the Docker Hub
and downloads a Docker Image.

A *Docker Image* is a single file with all the deps and config required to run a program.
We can use this Docker Image to create a *Container*, which we can understand as a program with
its own isolated set of hardware resources (memory, networking technology, harddrive space...)

### What do we get with Docker for Windows/Mac?

- Docker Client (Docker CLI): tools that we issue commands to, helps us interact
with the Docker Server
- Docker Server: actual piece of SW responsible of creating images, running
containers...


### Using the Docker Client
`docker run hello-world` is a command that can be used to check that your
Docker installation is working correctly. It will try to load the image `hello-world`
from local image cache. If unable, will download the image from `Docker Hub` and save
it in the image cache (for future executions). Then, it will run the image in a new container.

### What's a container?

Standard OS architecture has Processes (e.g. Chrome, or NodeJS) making System calls (like function invocations, e.g. write in hard drive) to the Kernel. The Kernel is the piece of SW that interacts with low-level computer
features such as CPU, Memory, and Hard Disk.

#### Example
Imagine that:

- Chrome requires Python v2
- NodeJS requires Python v3
- In our hard disk, we have Python v2, and we can't have Python v3 at the same time.

Solutions?

- Namespacing. Isolating resources per process. Use different HD segments for Chrome and NodeJS. Every time a System call is done to read from HD, the Kernel needs to know which process it
comes from!

- Control groups. cgroups limit the amount of resources that each process can use. The resources are
either Memory, CPU, HD I/O, Network bandwith...


Segments (assign resources) + Limit resources = Container. Notice that a container is all virtual, no hardware changes
are involved.

What's the relationship between an Image and a Container? An Image is a filesystem snapshot plus a Startup Command (e.g. run Chrome).

However, namespacing and control groups only work for Linux systems. How do they work on MacOS or Windows? On MacOS and Windows,
when you install Docker, you install a Linux Kernel. That Linux Kernel is the one in charge of implementing namespacing and control groups. To see the version of that Linux kernel, run
`docker version` and then check Server:OS/Arch
