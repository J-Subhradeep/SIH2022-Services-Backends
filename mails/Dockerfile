FROM node:slim
COPY . /dkt/mail_app/
WORKDIR /dkt/mail_app/
RUN yarn install --frozen-lockfile
EXPOSE 8087
CMD ["yarn","start"]