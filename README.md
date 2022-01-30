## Migrando para microsserviços usando feature flags no backend com AWS CloudWatch Evidently e Node.js

<img src="https://storage.googleapis.com/golden-wind/experts-club/capa-github.svg" />

Quando estamos quebrando um monólito em vários microsserviços, muitas vezes queremos fazer isso de forma gradual, fazendo com que as requisições comecem a ir aos poucos para o microsserviço. Isso pode ser por vários motivos, como por exemplo, testar a escalabilidade, ver se todos os mappers estão corretos, fazer testes internos antes do rollout total...

Uma técnica que pode ser usada para atingir tal objetivo é o uso de feature flags, dessa forma conseguimos ter o controle de quantas requisições itão para o nosso serviço,e, caso tudo dê errado, conseguimos desligar e ficarmos tranquilos enquanto investigamos o problema.

Neste repositório está o código da aula sobre como implementar feature flags no backend com AWS CloudWatch Evidently. Na branch `main` você encontra o código inicial e na branch `complete` o código que teremos no final da aula.

## Expert

| [<img src="https://avatars.githubusercontent.com/u/711732?s=460&u=6b1039f8a921c5733d92d13b2971c55157fee005&v=4" width="75px;"/>](https://github.com/askmon) |
| :-: |
|[André Spanguero Kanayama](https://github.com/askmon)|


### Requisitos

- Node.js v14 (`.nvmrc` incluso no projeto)
- Conta na AWS (utilizaremos o AWS CloudWatch Evidently)
- Um banco PostgreSQL (existe um docker-compose no projeto, para quem quiser rodar usando Docker)

### Como rodar

0. Antes de tudo, rode o comando `npm install`;
0. Caso queira rodar o banco localmente com Docker, pode-se utilizar o comando `docker-compose up` para subir o banco;
0. Renomeie o arquivo `.env.example` para `.env` e edite as variáveis para conexão com o banco;
0. Rode o comando `npm run sequelize:migrate` para gerar as tabelas;
0. Rode o comando `npm run sequelize:seed` para criar dados de exemplo nas tabelas;
0. Rode o comando `npm run dev` para rodar o projeto usando nodemon.
