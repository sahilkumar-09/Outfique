FROM node:20-alpine AS Outfique_builder
WORKDIR /app
COPY ./client/package*.json ./
RUN npm install
COPY ./client ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY ./server/package*.json ./
RUN npm install
COPY ./server ./
COPY --from=Outfique_builder /app/dist /app/public
EXPOSE 3000
CMD [ "node", "server.js" ]