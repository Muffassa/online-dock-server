FROM node:9
WORKDIR /app
COPY yarn.lock .
COPY package.json .
COPY wait-for-it.sh .
RUN npm install
COPY dist .
CMD node index.js