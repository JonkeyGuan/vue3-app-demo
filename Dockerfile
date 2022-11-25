FROM quay.io/jonkey/node:14 AS builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM quay.io/jonkey/nginx:1.17

USER nginx
COPY --from=builder /app/dist /app

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
