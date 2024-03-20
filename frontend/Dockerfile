FROM node:latest as build
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY nginx.con /etc/nginx/nginx.conf:ro
ENTRYPOINT ["nginx", "-g", "daemon off;"]