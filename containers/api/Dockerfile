FROM node:18-alpine
RUN apk add --no-cache docker-cli
WORKDIR /app
COPY src/package*.json ./
RUN npm install
COPY src/ .
EXPOSE 3000
CMD ["npx", "ts-node", "index.ts"]