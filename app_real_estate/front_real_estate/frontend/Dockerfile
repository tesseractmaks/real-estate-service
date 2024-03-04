FROM node:18 AS BUILD

RUN mkdir "app"

WORKDIR /app

COPY ./ ./

RUN npm init -y

RUN npm i webpack webpack-cli webpack-dev-server html-loader css-loader style-loader -D

RUN npm install --save-dev html-webpack-plugin mini-css-extract-plugin

RUN npm run build


FROM nginx:latest

COPY --from=BUILD ./app/src /usr/share/nginx/html/src
COPY --from=BUILD ./app/dist /usr/share/nginx/html/

COPY ./50x.html /usr/share/nginx/html/50x.html

#COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
CMD [ "nginx", "-g", "daemon off;" ]
