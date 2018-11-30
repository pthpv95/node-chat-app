FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./
COPY server ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
EXPOSE 5858

CMD ["npm","start"]
