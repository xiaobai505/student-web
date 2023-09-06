FROM node:16-alpine as build-stage

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@7.32.1 --activate

RUN npm config set registry https://registry.npmmirror.com

COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY .npmrc nginx.conf /etc/nginx/
# 重启NGINX的步骤
RUN service nginx restart

RUN ls /etc/nginx/
RUN cat /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
