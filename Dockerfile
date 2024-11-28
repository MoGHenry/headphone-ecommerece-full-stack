FROM node:20 AS frontend
WORKDIR /frontend
COPY package*.json /frontend/
RUN npm install
COPY . /frontend/

RUN npm run build
RUN cp -r build/* /frontend/a3/public/

WORKDIR /frontend/a3
RUN npm install

EXPOSE 8000
CMD ["npm", "start"]





#RUN npm install && npm install -g pm2
#CMD ["pm2-runtime", "start", "./bin/www"]
