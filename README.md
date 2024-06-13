# pizza.shop API (em desenvolvimento)

Aplicativo de restaurantes de entrega de comida. Back-end sendo construído com TypeScript, Drizzle, ElysiaJS, Docker e Postgres.

🔥 Este projeto visa manter a independência de runtime, ou seja, ele deve funcionar em Bun, Node, Cloudflare Workers ou qualquer runtime compatível com API Web Standard.

## Execução

Este projeto depende do Docker para configurar o banco de dados. Com o Docker instalado, clone o projeto, instale as dependências, configure os contêineres Docker e execute a aplicação.

> Você também deve executar as migrações para criar as tabelas do banco de dados e executar o seed para popular o banco de dados com dados fictícios.

```sh
bun i
docker compose up -d
bun generate
bun migrate
bun seed
bun dev
```


This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
