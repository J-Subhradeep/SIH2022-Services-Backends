FROM node:latest
COPY . /dkt/elastic/
WORKDIR /dkt/elastic/
RUN yarn install --frozen-lockfile
EXPOSE 8082
CMD ["yarn","start"]