FROM node:latest
COPY . /dkt/cloud
WORKDIR /dkt/cloud
RUN yarn --frozen-lockfile
EXPOSE 8081
CMD ["yarn","start"]
