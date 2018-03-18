FROM node:9
WORKDIR /app
COPY yarn.lock .
COPY package.json .
COPY wait-for-it.sh .
RUN npm install
ENV NODE_ENV production
COPY dist .
CMD node index.js
USER node