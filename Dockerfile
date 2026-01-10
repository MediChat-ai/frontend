FROM node:20-bullseye AS build

# Wire Vite build-time environment variables via build arguments
ARG VITE_BACKEND_URI
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_NAVER_CLIENT_ID
ARG VITE_NAVER_REDIRECT_URI
ARG VITE_RUNPOD_API_KEY
ARG VITE_RUNPOD_ENDPOINT_ID
ARG VITE_MODEL_NAME
ARG VITE_GROQ_API_KEY

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./
RUN corepack enable && yarn install --frozen-lockfile || npm install

COPY . .
RUN VITE_BACKEND_URI="$VITE_BACKEND_URI" \
	VITE_GOOGLE_CLIENT_ID="$VITE_GOOGLE_CLIENT_ID" \
	VITE_NAVER_CLIENT_ID="$VITE_NAVER_CLIENT_ID" \
	VITE_NAVER_REDIRECT_URI="$VITE_NAVER_REDIRECT_URI" \
	VITE_RUNPOD_API_KEY="$VITE_RUNPOD_API_KEY" \
	VITE_RUNPOD_ENDPOINT_ID="$VITE_RUNPOD_ENDPOINT_ID" \
	VITE_MODEL_NAME="$VITE_MODEL_NAME" \
	VITE_GROQ_API_KEY="$VITE_GROQ_API_KEY" \
	sh -c 'yarn build || npm run build'

FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]