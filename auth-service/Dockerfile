FROM node:20-alpine
WORKDIR /workspace

COPY pnpm-workspace.yaml ./

COPY ../main-db ./main-db

COPY ../auth-service ./auth-service

RUN npm install -g pnpm && pnpm install

WORKDIR /workspace/main-db
RUN pnpm prisma generate
RUN pnpm build

WORKDIR /workspace/auth-service

RUN pnpm build

CMD ["node", "dist/index.js"]
