## Integral's Account Transaction API

The API implements methods to retrieve token balances and transactions for a given account.

You can create & update accounts using the provided endpoints.

All accounts are persisted in-memory.

There's a rate limit of 100 requests per 15 minutes.

## Run locally

Ensure port `4041` is available on your machine. Rename `.env.sample` to `.env` and add Alchemy's API key.

1. `cd api`
2. `npm install`
3. `npm start`

## Postman Collection

You can import the environment and collection files from `/postman` path and run the collection from there for a better experience.

## API endpoints:

#### POST `/v1/account`

Request body:

```
{ "name": "", "wallet": "" }
```

#### GET `/v1/account`

Request body:

```
(none)
```

#### PUT `/v1/account/:accountId`

Request body:

```
{ "name": "", "wallet": "" }
```

#### GET `/v1/account/:accountId`

Request body:

```
(none)
```

#### GET `/v1/account/:accountId/transactions`

Request body:

```
(none)
```

#### GET `/v1/account/:accountId/balances`

Request body:

```
(none)
```
