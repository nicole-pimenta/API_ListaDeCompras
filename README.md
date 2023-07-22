# API_ListaDeCompras

Projeto com o objetivo de desenvolver a API para uma aplicação de lista de compras.

Endpoints do serviço

POST /purchaseList -
Criar uma nova lista de compras:

- sucesso - Objeto de lista - 201 CREATED

- entrada inválida - Objeto de mensagem - 400 BAD REQUEST

- tipo do valor de entrada inválido - Objeto de mensagem - 400 BAD REQUEST

GET/purchaseList -
Retorna todas as listas de compras:

- sucesso - Array de objetos de lista - 200 OK
