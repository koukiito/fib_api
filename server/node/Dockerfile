FROM node:20.0.0 AS builder
WORKDIR /node
COPY . .
RUN npm install
RUN npm run build

FROM node:20.0.0 AS runner
WORKDIR /node
COPY --from=builder /node/dist ./dist
COPY --from=builder /node/package* ./
RUN npm install --production
EXPOSE 8000
CMD ["npm", "start"]
