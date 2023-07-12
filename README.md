# Conversor de texto

[Link do site](https://vue-text-convert.vercel.app/)

Este é um simples projeto para converter alguns tipos de texto e te ajudar a ter uma agilidade caso precise formatar seu texto para um formato especifico.

O projeto foi desenvolvido usando Vue 3 com typescript e também utilizei vite para ajudar na produtividade.

O projeto conta com testes unitários com vitest e vue test utils e também testes E2E com cypress, além de um script para automatizar o deploy na vercel com github actions.

Algumas outras ferramentas foram utilizadas para ajudar a padronizar o código como eslint e prettier para formatar o código e aplicar regras de padronização e também o husky com lint-staged para ajudar a evitar que commits sejam feitos com algum erro de padronização no código.

## Rodar o projeto

Caso queira rodar na sua maquina basta siga as instruções:

 - Faça um clone do repositórios
 - Na raiz do projeto rode o comando `npm install` para instalar as dependência do projeto
 - Após instalar as dependência  use o comando `npm run dev` para iniciar o servidor
(Todos os comandos estão na parte **script** no arquivo **package.json**)

### Rodando os testes

Para rodar os testes com o vitest utilize o comando `npm run test:unit` que ele ira rodar os testes unitários.

Para rodar os testes com o cypress use o comando `npm run test:e2e:dev` o cypress irá abrir a interface gráfica dele, basta selecionar o navegador que deseja rodar os testes que ele irá abrir uma aba contendo todos os testes disponíveis, basta clicar em um dos testes que o cypress ira roda-los.

 