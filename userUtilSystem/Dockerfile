FROM node:latest
COPY . /dkt/util/
WORKDIR /dkt/util/
RUN yarn install --frozen-lockfile
EXPOSE 8080
CMD ["yarn","start"]