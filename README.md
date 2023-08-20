## Newton Classroom

### Setup

1. Manual Setup

```
yarn install   # install dependencies

# setup prisma
# DATABASE_URL must be in .env file
npx prisma generate
npx prisma migrate dev

yarn start     # run the server
```

2. Using Dockerfile

```
docker build -t <image name> .
docker run -p 3000:3000 <image name>
```
