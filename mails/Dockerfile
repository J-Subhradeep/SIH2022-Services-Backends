FROM node:slim
COPY . /dkt/mail_app/
WORKDIR /dkt/mail_app/
RUN yarn 
EXPOSE 8087
CMD ["yarn","start"]