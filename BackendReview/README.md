- Criar arquivo knexfile.ts => `knex init -x ts`
- Criar migração => `npm run knex migrate:make MIGRATION-NAME -x ts`
- Subir última migration => `npm run knex migrate:latest`
- Criar seed => `npm run knex seed:make SEED-NAME`
- Rodar seed => `npm run knex seed:run`

- Criar imagem do deste projeto para usar no docker `docker build -t minha-api-demo:v1 .`
- Rodar container com a image `docker run -p 3333:3333 minha-api-demo:v1`

- Rodar container com imagem em BACKGROUND `docker run -p 3333:3333 -d  minha-api-demo`
- Pausar container em execução `docker pause f22c39a645da`
- Despausar container em execução `docker unpause f22c39a645da`

- Parando conainer em execução `docker pause f22c39a645da`
- Startar novamente container `docker start f22c39a645da`

- Deletar container `docker rm f22c39a645da`
- Deletar imagem `docker rmi ID_DA_IMAGEM`

- Criar volume `docker volume create NOME_DO_VOLUME`
- Criar container com volume `docker run -v meu-volume:/user/src/app -p 3333:3333 -d minha-api-demo`

- Rodar container com imagem (comando direto, sem dockerfile) `docker run --name NOME-DO-CONTAINER -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d bitnami/postgresql:latest`