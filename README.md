# ROVER TEST

[Also available in Brazilian portuguese](./README-pt-BR.md)

## Setup

In order to setup the local env you need to have those installed:

- node
- npm ( Or another package manager )
- Docker
- git
- [prisma cli](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)

### After clone the repo with:

```sh
  git clone git@github.com:barreiradlc/rover-challenge-voyage.git
```

### Go to the folder of the file and run the pakage manager install:

```sh
  cd rover-challenge-voyage

  npm i # or simply "yarn"
```

### Do the DB setup with Docker:

```sh
#  Initial setup
docker run --name voyager_rover_db -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=voyager_rover -p 5432:5432 bitnami/postgresql

# Run in forward ocasions
docker start voyager_rover_db
```

### Copy env vars

```sh
  cp .env.sample .env
```

### Configurando DB

```sh
  # Setup prism in yout local env
  npx prisma generate
  
  # Migrating database
  npx prisma migrate dev
```

### Runnig the App

```sh
  npm run start:dev
```

Now the App should be runnig in the Adress: http://localhost:3333
To interact with it in a simple way you can use the vs code extension [Rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) Setted on those files:

> src/http/controllers/plateu/plateau.http

> src/http/controllers/rover/rover.http


### Testes 

```sh
 npm run test
```

## Considerações finais

The functional part is delivered in the first version of the App, others that were not included at first were included as a self-evaluation process.
I wish I could had time to invest in a complete version but to deal with the deadline as intended I prefer to deliver the fist part and do the extra mile after sending a functional version of the project.
Until the day of the delivery I will add my requirements to the project, clean it even more, do a coverage to the other places of the App and if possible develop a frontend for it. 

## Getting the requirements for the project

### FRs (Functional requirements)

- [x] Should be able to create a plateau

- [x] Should be possibleto find a created plateau;

- [x] Should be possible to create a Rover;

- [x] Should be able to move the Rover;

### BRs (Business rules)

- [x] A Rover can't land where another one is placed before

- [x] A Rover can't move to where another one is occupiyng the same position

- [x] A Rover can't move to outside the Plateau boundaries


### NFRs (Non-functional requirements )

- [x] The project will be scalated in TDD to avoid refactorings and the usage of unnecessary libraries and strategies to reach a final result.

- [x] The entities will be written in english to avoid any language issues 


### TODO (in case of having time to)

- [ ] Better the Errors typing

- [x] Avoid that Roves leave the plateau boundaries

- [ ] Avoid that Rovers colid with each other in intermediate positions

- [x] Avoid that Rovers stop in the same position as previous created ones
