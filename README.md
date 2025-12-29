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

## Commits

This project uses [conventional commits](https://conventionalcommits.org) system. To commit, you must use meaningful commit messages:  
`<type>(<scope>): <message>`. For example:

`feat(auth): add bcrypt to hash passwords`
OR
`fix(photos): fix deleted photos being displayed`

For Husky hooks to work correctly when committing via VS Code you must create a file `~/.config/husky/init.sh` with the following content, assuming you're using [Node Version Manager](https://github.com/nvm-sh/nvm):

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Otherwise when trying to commit it throws "npx: not found" error
