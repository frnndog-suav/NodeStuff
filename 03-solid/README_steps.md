## Configuração

**Opcional**
    - Instalar prettier
    - `npm i eslint -D` (lint)
    - `npm i @rocketseat/eslint-config -D` (configuração)

1 - Levantar requisitos

2 - Executar `npm init -y` para criar o arquivo package.json

3.0 - Criar arquivo `.npmrc` para fixar a versão dos pacotes que vão ser instalados

3.1 - Instalar:
    - `npm i typescript --save-dev`
    - `npm install --save-dev @types/node`
    - `npm i tsup -D` (lib para criar a build)
    - `npm i fastify` (framework backend)
    - `npm install dotenv --save` (lib para ler variáveis de ambiente)
    - `npm install --save-dev tsx` (lib para executar código typescript (node não entende código typescript) - converte código typescript em javascript)
    - `npm i zod` (lib para validação de dados)
    - `npm i bcryptjs` (lib para fazer hash)
    - `npm install --save @types/bcryptjs` 
    - `npm i dayjs` 
    - `npm i @fastify/jwt` 
    - `npm install -D vitest` (lib de teste) 
    - `npm install -D npm i vite-tsconfig-paths` (completemento para lib de teste - reconhecimento dos paths - configurar arquivo "vite.config.ts" para funcionar)

4 - Executar `npx tsc --init` para criar o arquivo tsconfig.json

5 - Trocar "target" do arquivo tsconfig.json de "es2016" para "ES2020"

6 - Criar arquivo "app.ts" e declarar `export const app = fastify()`

7 - Criar aquivo "server.ts" e declarar o "listen" da aplicação 

8 - Criar scripts no package.json:
```json
"scripts":  {
	"dev":  "tsx watch src/server.ts",
	"prod":  "node build/server.js",
	"build":  "tsup src --out-dir build",
},
```

9 - Criar arquivo de variáveis de ambiente (src/env/index.ts)

## Configuração ORM

1 - Instalar `npm i prisma -D`

2 - Executar `npx prisma init`

3 - Criar schema de tabelas em "prisma\schema.prisma"

4 - Executar comando `npx prisma generate` (criar de forma automática a tipagem do schema)

5 - Instalar `npm i @prisma/client`

6 - Instalar docker
    - user: docker
    - pass: docker

7 - Rodar comando `docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest` pelo cmd

7.1 - Criar arquivo na raíz "docker-compose.yml" para deixar salvo este comando. Para executa-lo, basta usar o comando `docker compose up -d`

8 - Atualizar variável de ambiente "DATABASE_URL" no arquivo .env

9 - Rodar comando `npx prisma migrate dev` para atualizar o banco
    - nomear migration

9.1 - É possível executar `npx prisma studio` para abrir uma interface no browser do banco



## Fluxo de criação de uma funcionalidade
1 - Criar use-case

1.1 - Criar testes do use-case

2 - Criar controller

2.1 - Criar testes de controller

3 - Criar rota
