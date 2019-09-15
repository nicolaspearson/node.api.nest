# Node + Nest + Express

A simple Node.js API, written using Typescript, and Nest with Express.

## Getting Started

**1. Clone the application**

```bash
git clone https://github.com/nicolaspearson/node.api.nest.git
```

**2. Start the database**

```bash
cd docker
docker-compose  up
```

**3. Build and run the app using npm**

#### Install dependencies

```bash
yarn install
```

#### Run the app in development mode:

```bash
npm run start
```

The app will start running at <http://localhost:3000>

#### Run the app in watch mode:

```bash
npm run start:dev
```

The app will start running at <http://localhost:3000>

#### Run the app in production mode:

```bash
npm run start:prod
```

The app will start running at <http://localhost:3000>

**3. Test the app using jest**

#### Run unit tests:

```bash
npm run test:unit
```

#### Run end to end tests:

```bash
npm run test:e2e
```

#### Run test coverage:

```bash
npm run test:cov
```

## Endpoints

The following endpoints are available:

```
POST /auth/login
```

```
GET /me
```

```
GET /hero/{heroId}
```

```
GET /heroes
```

```
POST /hero
```

```
PUT /hero/{heroId}
```

```
DELETE /hero/{heroId}
```

## Migrations

```
npm run typeorm:cli -- migration:create -n Initial
```

## Contribution Guidelines

Never commit directly to master, create a feature branch and submit a pull request.
