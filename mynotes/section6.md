# Section 6. Creating a Production-Grade Workflow

## Development Workflow

Circular flow, Development - Testing - Deployment

## Flow Specifics

Github Repo

- feature branch, where we make our changes

- master branch, official version of the app

Travis CI

- get code from master, run a number of tests

- if tests pass, then our code base will be pushed to AWS


Flow

1. Make changes in local computer
2. Create pull request to merge changes from feature into master
3. The pull request will set off:
    1. Travis CI tests
    2. If tests pass, merge PR with master
    2. Travis CI will automatically deploy to AWS Hosting


## Docker's Purpose
The purpose of Docker is to make our lives much easier when implementing this flow!

## Necessary commands
- npm run start. Starts up a development server
- npm run test. Run tests associated with the project
- npm run build. Build a production version of the application
  - concatenate all files in project into single file that can be used in production

Since we use different commands in development and production, it makes sense
to use different Dockerfiles for each.

## Creating the Dev Dockerfile

How do we build a Dockerfile with a custom name?

```
docker build -f Dockerfile.dev .
```
Don't forget the path to specify the environment at the end!


## Duplicating Dependencies

Trick: if something doesn't need to be copied, don't copy it! An example in a React project is the node_modules folder

## Docker Volumes

We want that changes in our source code can automatically show up in our running
container.

Volumes are a solution. They create references in our Docker container that
point back to the folders in our local machine.

Why not use before? Kind of painful to set them up. Example:

```
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app
```

Second -v maps the app subdirectory to the current directory. The first -v
bookmarks the node_modules in the app to avoid creating a void reference (that
  returns an error)

## Executing tests

Run `npm run test` after run command:
```
docker run -it jmonteroers/frontend npm run test
```
The -it flag (t stands for pseudo-terminal) is needed to trigger test runs
afterwards by pressing Enter.

## Live updating tests
```
docker exec -it container_id npm run test
```
Downside, we need the `container_id`

## Docker-compose for Running Tests
Adding a new service in docker-compose for tests. Not a perfect solution, since
we can't run tests interactively.

A possible solution would be to use `docker attach container id`. But this
doesn't work! (can't interact) Why doesn't? The reason is that docker attach tries
to attach a terminal to the primary process (`npm run tests`), but the tests are
actually run by a secondary process!

## Need for Nginx (Production environment)

Web container structure in Development has a Dev server that takes the main.js and
the index.html files and serves them to your browser.

Dev Server is not appropriate in a production environment. It is inefficient as
it has many tools to interact with the source code. To replace it, we're going
to use Nginx that lets us build this server in production.

The difference now is that instead of running `npm run start`, we'll execute
`npm run build`. Afterwards, we need to start `nginx`. Couple of improvements:

- we don't need the dependencies after building the app
- how do we get nginx?? how do we integrate two base images (node:alpine, and some-ngnix)
  - each image can be used in a separate phase:
    - build phase: use node:alpine for that
    - run phase: use nginx
    - these two phases need to talk with each other! (we need to copy the built bundle to the run phase)
