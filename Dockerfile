FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# run npm build
RUN npm run build
# copy contents of build folder to a3/public folder
RUN cp -r build/* /app/a3/public/
# change working directory to a3 folder
WORKDIR /app/a3
RUN npm install && npm install -g pm2

EXPOSE 3000
CMD ["pm2-runtime", "start", "./bin/www"]

