# ROVER TEST

[Também disponível em inglês](./README-pt-BR.md)

## Setup

Para configurar o projeto precisa-se ter instalados:

- node
- npm ( ou outro gerenciador de pacotes de sua escolha )
- Docker
- git
- [prisma cli](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)

### Após fazer o clone do projeto com:

```sh
  git clone git@github.com:barreiradlc/rover-challenge-voyage.git
```

### Navegue até a pasta a qual ele está execute:

```sh
  npm i # ou "yarn"
```

### Faça o setup do docker

```sh
#  setup inicial
docker run --name voyager_rover_db -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=voyager_rover -p 5432:5432 bitnami/postgresql

# executar em demais outras ocasiões
docker start voyager_rover_db
```

### Copiando variáveis de ambiente

```sh
  cp .env.sample .env
```

### Configurando DB

```sh
  # configurar prisma no ambiente local
  npx prisma generate
  
  # migrar banco de dados
  npx prisma migrate dev
```

### Inicialzando a aplicação

```sh
  npm run start:dev
```

A aplicação estará disponível no endereço http://localhost:3333
Para interagir com ela é possível utilizar os próprios arquivos de http, por meio da extensão do vscode chamada [Rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) disponíveis em:

> src/http/controllers/plateu/plateau.http

> src/http/controllers/rover/rover.http


### Testes 

```sh
 npm run test
```

## Considerações finais

A parte funcional do que foi proposto está finalizado, certos requisitos que não estavam no escopo pedido foram colocados como forma de avaliação própria.
Queria ter terminado tudo mas para respeitar o prazo irei entregar a primeira versão antes que se extenda mais o prazo.
Até o dia da avaliação irei incrementar mais com os requisitos que citei, limpando o códico ainda mais, fazendo testes em outros locais da aplicação e se possível criar um frontend para a versão final

## Destrinchando as intruções do projeto

### FRs (Requisitos funcionais)

- [x] Deve ser possível criar uma matriz

- [x] Deve ser possível encontrar a matiz criada;

- [x] Deve ser possível criar Rover;

- [x] Deve mover o Rover;

### RNs (Regras de negócio)

- [x] Um Rover não pode aterrissar aonde outro está ocupando a mesma coordenada

- [ ] Um Rover não pode se mover aonde outro está ocupando a mesma coordenada

- [x] Um Rover não pode se mover ao alcançar os limites da matriz


### RNFs (Requisitos não funcionais)

- [x] O projeto será escalado em TDD para evitar refatorações desnecessárias e uso de bibliotecas e estratégias desnecessárias para a finalização do mesmo.

- [x] As entidades serão escritas em inglês para evitar problemas relacionados com pluralizações e fidelidade com seus fins dada a ausência de acentos e outras pontuações.



### TODO (caso haja tempo)

- [ ] Melhorar a tipagem dos erros

- [x] Prevenir que rovers saiam das extremidades da matriz

- [ ] Prevenir que rovers colidam uns com os outros em posições intermediárias

- [ ] Prevenir que rovers parem no mesmo destino final
