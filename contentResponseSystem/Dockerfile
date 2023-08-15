FROM node:latest
COPY . /dkt/lcs/
WORKDIR /dkt/lcs/
RUN yarn --frozen-lockfile
EXPOSE 8083
CMD ["yarn","start"]
