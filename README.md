# Alar Users Management

## An application to manage users built in Angular 12 + Nest.js 8 + PostgreSQL + Docker

1. To run the project use:
```
docker-compose up
```

2. To run seeds, go inside Docker container bash:
```
docker container ls
```
```
docker exec -it CONTAINER_ID (alar-users_server) bash
```
```
npm run seed
```

3. All database migrations will be set on the first application start.

(c) 2021 Eduard Sobotnyk.
