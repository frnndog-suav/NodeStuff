## Configuração

**Opcional**
    - Instalar prettier

1 - Levantar requisitos

2 - Executar `npm init -y` para criar o arquivo package.json

3 - Instalar `npm i typescript --save-dev`, `npm install --save @types/node`, `npm i tsup -D`, `npm i fastify` e `npm install --save-dev tsx`
    - **tsx**: lib para executar código typescript (node não entende código typescript) - converte código typescript em javascript
    - **tsup**: lib para criar a build

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