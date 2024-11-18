FROM node:20 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN cp -r build/* /app/a3/public/


WORKDIR /app/a3
RUN npm install && npm install -g pm2

EXPOSE 3000
CMD ["pm2-runtime", "start", "./bin/www"]
