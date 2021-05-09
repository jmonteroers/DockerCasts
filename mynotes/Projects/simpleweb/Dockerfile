# specify base image
# notice how we need to change the alpine image version to add npm
# all after colon is the version
FROM node:alpine

# change working directory
# any following command will be executed relative to this path in the container
WORKDIR /usr/app

# copy everything from build context to current directory
COPY ./ ./
# install node packages
RUN npm install

# specify command to run on container startup
CMD ["npm", "start"]
