# NestJS Boilerplate

## Contents

* NestJS server (Express-based)
* Docker compose file
* Dotenv
* PostgreSQL
* TypeORM config
* ESLint
* GraphQL
* Migrations base
* Types for pagination mechanisms
* Pre-commit hook that applies ESLint fixes

## Launch

```bash
docker compose up -d
yarn start:dev
```

To test it, go to `http://localhost:3000/graphql` and paste the request:

```graphql
{
  test
}
```

On the GraphQL Playground you should see `{ "data": { "test": 1 } }` object on the right side of the screen, indicating that the database is connected and the app works as intended

## Usage

To create a migration use npm script:

`yarn migration:create <migration name>`

The migration basic file will be created on the root level of the project. Move it to `src/migrations`, rename if needed and write SQL migration code.

You can run, see existing migrations and revert them using the following scripts:

```bash
yarn migration:run
yarn migration:show
yarn migration:revert
```
