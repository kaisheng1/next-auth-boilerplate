# Next.js Authentication Boilerplate

This is a boilerplate using next.js, next-auth and prisma to handle authentication and authorization.

## Dependencies

First, install the dependencies:

```bash
npm install
```

## Environment

Follow .env.example to create your own .env.local. The Github provider requires
client id and secret, so you should authorise the app with your Github [here](https://github.com/settings/applications/new).

## Database (Prisma)

To include your own database, modify the datasource in prisma/schema.prisma. After modifying the datasource,
apply the migrations:

```bash
npx prisma dev --preview-feature
```
