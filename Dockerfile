ARG BUILD_CONFIG=dev
# Étape 1 : Build Angular app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=dist --configuration=$BUILD_CONFIG

# Étape 2 : Serve avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]