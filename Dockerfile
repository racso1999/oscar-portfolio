FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

# Use SPA fallback so direct routes like /projects/* resolve to index.html.
RUN rm -f /etc/nginx/conf.d/default.conf && \
		printf '%s\n' \
			'server {' \
			'  listen 80;' \
			'  server_name _;' \
			'  root /usr/share/nginx/html;' \
			'  index index.html;' \
			'' \
			'  location / {' \
			'    try_files $uri $uri/ /index.html;' \
			'  }' \
			'}' > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
	CMD wget -qO- http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
