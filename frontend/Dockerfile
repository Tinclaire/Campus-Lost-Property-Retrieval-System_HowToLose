FROM node:latest as build
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY . .
# With ARG and ENV, you can use:
# `docker build --build-arg REACT_APP_API=http://localhost . -t repo/image:tag`
# to set ENV when building image.
ARG REACT_APP_API
ENV REACT_APP_API=$REACT_APP_API
RUN npm run build

FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY nginx.con /etc/nginx/nginx.conf:ro
ENTRYPOINT ["nginx", "-g", "daemon off;"]