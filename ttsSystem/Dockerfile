FROM node:slim
COPY . /dkt/tts/
WORKDIR /dkt/tts/
RUN yarn install --frozen-lockfile
EXPOSE 8088
CMD ["yarn","start"]
