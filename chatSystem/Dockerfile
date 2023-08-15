FROM node:latest
COPY . /dkt/chat
WORKDIR /dkt/chat
RUN yarn --frozen-lockfile
EXPOSE 8085
CMD ["yarn","start"]
