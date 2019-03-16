FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY server ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm","start"]
