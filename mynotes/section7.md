# Section 7. Continuous Integration and Deployment with AWS

## Travis CI

We need to tell Travis CI to:

- Run a copy of Docker
- Build our image using Dockerfile.dev
  - Dockerfile.dev was the one created for testing in development!
- Run our test suite
  - Travis test will fail if test suite returns non-zero return code
  - `docker run <image> npm run test`. This command doesn't work, since it hangs and
  waits for human input
  - instead need to run `docker run -e CI=true <image> npm run test`, to add the CI
  environment variable and prevent the test from hanging
- Deploy to AWS


In a pull request, Travis CI tests our code when the PR is created and after
merging with master.

## AWS Beanstalk

The benefits of using this service is that it will create a Load Balancer for
us. When the amount of traffic requires to scale our application, it will
automatically do so for us.
