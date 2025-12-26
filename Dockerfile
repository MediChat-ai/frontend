FROM node:20-bullseye AS build

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./
RUN corepack enable && yarn install --frozen-lockfile || npm install

COPY . .
RUN yarn build || npm run build

FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]