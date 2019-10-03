# Node + Nest + Express

A simple Node.js API, written using Typescript, and Nest.js with Express.

For more information regarding Nest.js see the [official documentation.](https://docs.nestjs.com/)

## Getting Started

**1. Clone the application**

```
git clone https://github.com/nicolaspearson/node.api.nest.git
```

**2. Start the database**

```
cd docker
docker-compose  up
```

**3. Build and run the app using npm**

#### Install dependencies

```
yarn install
```

#### Run the app in development mode:

```
npm run start
```

The app will start running at <http://localhost:3000>

#### Run the app in watch mode:

```
npm run start:dev
```

The app will start running at <http://localhost:3000>

#### Run the app in production mode:

```
npm run start:prod
```

The app will start running at <http://localhost:3000>

**4. Test the app using jest**

#### Run unit tests:

```
npm run test:unit
```

#### Run end to end tests:

```
npm run test:e2e
```

#### Run test coverage:

```
npm run test:cov
```

## Endpoints

### Swagger

Swagger has been integrated into the application, once the app is up and running visit <http://localhost:3000/api>

See the official [documentation](https://docs.nestjs.com/recipes/swagger) for more information.

### Insomnia (REST Client)

The easiest way to interact with the API is via the provided `./api/insomnia.json` file. Firstly, download [Insomnia](https://www.insomnia.rest/), then import the contents of aforementioned JSON file.

## Migrations

```
npm run typeorm:cli -- migration:create -n Initial
```

## Contribution Guidelines

Never commit directly to master, create a feature branch and submit a pull request.
