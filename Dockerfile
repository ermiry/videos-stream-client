FROM node:alpine as builder

ENV REACT_APP_RUNTIME=Production

WORKDIR '/home/stream'

COPY . .
RUN npm install --production
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/stream/build /usr/share/nginx/html
