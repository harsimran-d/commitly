FROM node:20-alpine
WORKDIR /app

COPY package.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm list typescript || pnpm add -D typescript
RUN pnpm build

CMD ["pnpm", "start"]