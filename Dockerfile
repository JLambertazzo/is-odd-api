FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "ts-node", "index.ts"]