# ROVER TEST

## Setup

### docker db setup

```sh

docker run --name voyager_rover_db -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=voyager_rover -p 5432:5432 bitnami/postgresql

docker start voyager_rover_db
```

## FRs (Requisitos funcionais)


- [ ] Deve ser possível criar uma matriz

- [ ] Deve ser possível encontrar a matiz criada;

- [ ] Deve mover o Rover;

## RNs (Regras de negócio)

- [ ] Um Rover não pode aterrissar aonde outro está ocupando a mesma coordenada

- [ ] Um Rover não pode se mover aonde outro está ocupando a mesma coordenada

- [ ] Um Rover não pode se mover ao alcançar os limites da matriz


## RNFs (Requisitos não funcionais)

- [ ] O projeto será escalado em TDD para evitar refatorações desnecessárias e uso de bibliotecas e estratégias desnecessárias para a finalização do mesmo.

- [ ] As entidades serão escritas em inglês para evitar problemas relacionados com pluralizações e fidelidade com seus fins dada a ausência de acentos e outras pontuações.



## TODO (caso haja tempo)

- [ ] Melhorar a tipagem dos erros