## Requisitos funcionais
Funcionalidades da aplicação

- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar um academia



## Regras de negócio
Caminhos que cada requisito pode tomar (condições pra cada requisito funcional)

- [ ] O usuário não deve poser se cadastrar com um e-mail duplicado
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só poder ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrado por administradores


## Requisitos não funcionais
Não partem do cliente. Requisitos técnicos

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam ester persistidos em um banco Postgres
- [ ] Todas as lista de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT 