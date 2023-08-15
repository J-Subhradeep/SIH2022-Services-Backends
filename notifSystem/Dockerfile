FROM node:slim
COPY . /dkt/notif
WORKDIR /dkt/notif
RUN yarn --frozen-lockfile
EXPOSE 8089
CMD ["yarn","start"]