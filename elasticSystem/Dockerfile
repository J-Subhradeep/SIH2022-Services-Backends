FROM node:latest
COPY . /dkt/elastic/
WORKDIR /dkt/elastic/
RUN yarn 
EXPOSE 8082
CMD ["yarn","start"]