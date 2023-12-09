FROM node:18-alpine as build-stage

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@8.6.10 --activate

RUN npm config set registry https://registry.npmmirror.com

COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY .npmrc nginx.conf /etc/nginx/
RUN ls /etc/nginx/
RUN cat /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
