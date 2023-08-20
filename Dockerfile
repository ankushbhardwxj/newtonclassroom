FROM node:alpine

WORKDIR /usr/src/app

ENV DATABASE_URL="postgres://tickets_yq8p_user:WINqHfv3Madf5DeFLHAOEJAdECKOc1hJ@dpg-cjh2bh41ja0c739sac60-a.oregon-postgres.render.com/tickets_yq8p"
ENV AUTH_TOKEN="ZwZfkQ3LcUh3d8HS4JBulzmO1eNCXgTv"

COPY package*.json ./

RUN yarn install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate dev --skip-seed

EXPOSE 3000

CMD ["yarn", "start" ]