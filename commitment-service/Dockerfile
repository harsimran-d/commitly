FROM node:20-alpine
WORKDIR /workspace

COPY pnpm-workspace.yaml ./

COPY ../main-db ./main-db

COPY ../commitment-service ./commitment-service

RUN npm install -g pnpm && pnpm install

WORKDIR /workspace/main-db
RUN pnpm prisma generate
RUN pnpm build

WORKDIR /workspace/commitment-service

RUN pnpm build

CMD ["node", "dist/index.js"]
