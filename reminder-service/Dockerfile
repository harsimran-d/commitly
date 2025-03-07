FROM node:20-alpine
WORKDIR /workspace

COPY pnpm-workspace.yaml ./

COPY ../main-db ./main-db

COPY ../reminder-service ./reminder-service

RUN npm install -g pnpm && pnpm install

WORKDIR /workspace/main-db
RUN pnpm prisma generate
RUN pnpm build

WORKDIR /workspace/reminder-service

RUN pnpm build
EXPOSE 9000
CMD ["node", "dist/index.js"]
