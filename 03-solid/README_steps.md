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

