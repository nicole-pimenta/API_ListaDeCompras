# API_ListaDeCompras

Projeto com o objetivo de desenvolver a API em NodeJs para uma aplicação de lista de compras.
O banco de dados deve ser volátil, um array que seja zerado toda vez que a aplicação reiniciar.

Endpoints do serviço

POST /purchaseList -
Criar uma nova lista de compras:

- sucesso - Objeto de lista - 201 CREATED

- entrada inválida - Objeto de mensagem - 400 BAD REQUEST

- tipo do valor de entrada inválido - Objeto de mensagem - 400 BAD REQUEST

GET/purchaseList -
Retorna todas as listas de compras:

- sucesso - Array de objetos de lista - 200 OK

GET/purchaseList/<purchaseListId> -Pega uma lista de compras específica:

- sucesso - Objeto de lista - 200 OK

- lista não encontrada - Objeto de mensagem - 404 NOT FOUND

PATCH//purchaseList/<purchaseListId>/<itemName>
-Atualiza os dados de um item da lista:

- sucesso - Objeto de lista - 200 OK

- item não encontrado na lista - Objeto de mensagem - 404 NOT FOUND

- lista não encontrada - Objeto de mensagem - 404 NOT FOUND

- entrada inválida - Objeto de mensagem - 400 BAD REQUEST

- tipo do valor de entrada inválido - Objeto de mensagem - 400 BAD REQUEST

DELETE /purchaseList/<purchaseListId>/<itemName>
Deleta um item da lista:

- sucesso - nenhum retorno - 204 NO CONTENT

- item não encontrado na lista - Objeto de mensagem - 404 NOT FOUND

- lista não encontrada - Objeto de mensagem - 404 NOT FOUND

DELETE/purchaseList/<purchaseListId>
Deleta uma lista:

- sucesso - Objeto de lista - 204 NO CONTENT

- lista não encontrada - Objeto de mensagem - 404 NOT FOUND
