# ifandonlyif dev guide

this project is based on [Nuxt 3](https://nuxt.com/) framework

## installation

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## setup config

edit .env file

```
cp .env .env.example
vim .env
```

- NUXT_PUBLIC_API_BASE
    - url to deployed ifandonlyif-backend
- NUXT_ADMIN_PASSWORD
    - password is used to login admin account

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```