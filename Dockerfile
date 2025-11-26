FROM third-party-registry.fabit.ru/docker.io/library/node:20.15.0-alpine3.20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build
CMD ["npm", "run", "start"]
