#############
#  builder  #
#############

FROM node:18-alpine3.18 AS builder

# create and set working directory
RUN mkdir /app
WORKDIR /app

# env vars
ENV PATH /app/node_modules/.bin:$PATH

# install deps
COPY package*.json ./
RUN npm ci \
  --loglevel silly

# copy in source files
COPY . /app

# build app
RUN npm run build

############
#  server  #
############

FROM nginx:latest
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html/
COPY ./server.conf /usr/local/nginx/default.conf
CMD ["nginx", "-g", "daemon off;"]
