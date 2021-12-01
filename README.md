# kanban board (em desenvolvimento)

Este é um quadro de kanban simples que está sendo desenvolvido para exercitar o conhecimento adquirido ao longo dos módulos de frontend do curso de Web Full Stack da Let's Code. Abaixo segue as orientações para a elaboração do projeto.

### Projeto Final - Angular
O propósito desse desafio é a criação de frontend para um quadro de kanban. Esse quadro possui listas, que contém cards. O uso de uma biblioteca de CSS é obrigatório.

### Rodando a API
Uma API de exemplo foi disponibilizada na pasta BACK

Para rodá-la, faça:

> cd BACK
> npm install
> npm run server
Ela responderá na porta 5000.


A API nesse projeto utiliza JWT para autenticação, você deve fazer a seguinte requisição antes qualquer outra:

(POST) http://0.0.0.0:5000/login/

{ "login":"letscode", "senha":"lets@123" }
Feita a requisição você receberá um token em formato json. Esse token deve ser enviado em todas as requisições subsequentes pelo header Authorization de acordo com o padrão JWT.

Authorization: 'Bearer <token>'

Lembre-se de setar os headers Accept e ContentType para json em todas as requisições...

A API tem os seguintes entrypoints:

(GET)     http://0.0.0.0:5000/cards/
(POST)    http://0.0.0.0:5000/cards/
(PUT)     http://0.0.0.0:5000/cards/{id}
(DELETE)  http://0.0.0.0:5000/cards/{id}
GET obtém uma lista de cards.

A API retorna um array com o seguinte formato:

[
  {
    id: uuid,
    titulo: string,
    conteudo: string,
    lista: string
  },
  ...
]
POST adiciona um novo card, passe-o pelo corpo da requisição com o seguinte formato:

{
  titulo: string,
  conteudo: string,
  lista: string
}
A api retornará o card completo como o id atribuído.

PUT altera um card existente, passe o id na URL e o card completo pelo corpo da requisição de acordo com o formato:

{
  id: uuid (o mesmo passado na URL),
  titulo: string,
  conteudo: string,
  lista: string
}
A api retornará o card completo que foi salvo.

DELETE remove um card existente, passe o id na URL.

A API retornará a lista dos cards que sobraram (igual ao GET).

[
  {
    id: uuid,
    titulo: string,
    conteudo: string,
    lista: string
  }
]
Atenção: As rotas tem validações e retornos diferentes dependendo do resultado:

POST e PUT retornam 400 se titulo, conteudo ou lista forem avaliados como falsy.

PUT também retorna 400 se o id passado na URL não for igual ao do objeto passado no corpo da requisição.

PUT e DELETE retornam 404 se não encontrarem um card com o id passado na URL.

Todas as rotas retornam 401 se o token não for passado, for inválido, mal-formado ou expirado.

### Requisitos
Os requisitos abaixo devem ser desenvolvidos na pasta "FRONT".
A API deve ser usada para persistência dos cards (ela trabalha com persistência em memória) e não deve ser alterada.

A interface gráfica serão 2 telas:

tela do quadro de kanban: deve haver três colunas chamadas "To do", "Doing" e "Done".
tela de login: formulário para inserção de login e senha.
A tela de login deve ser acessada na rota /login e a tela do quadro de kanban deve ser acessada na rota /kanban-board.

Obs: A tela do quadro de Kanban só deve ser acessada caso o exista um token no localStorage. Caso não exista, o usuário deve ser redirecionado para uma página de erro.

Os cards devem ser listados nessas colunas de acordo com o valor do campo lista presenta no card. Os valores de lista devem ser "ToDo", "Doing" e "Done", respectivamente.

Deve haver um local que permita criar um card passando valores para o titulo e conteudo, deve haver um botão para adicionar o card.

Um novo card deve sempre cair na lista "To Do" após persistido na API.

O card deverá ter dois modos: Visualização e Edição.

No modo de visualização o card terá um cabeçalho com seu título, o conteúdo e 4 botões.

Um dos botões do card deverá excluí-lo (persistindo pela API), outro colocá-lo em modo de edição.

Os dois outros botões devem mudar o card para a lista anterior (se houver) ou para a lista seguinte (se houver). A decisão de desabilitar, esconder ou apenas não gerar o evento desses botões quando não houver a proxima lista ou a anterior é sua.

No modo de edição, o card conterá um input para o titulo, um textarea para o conteudo e dois botões.

No modo de edição, um dos botões cancela a edição, quando pressionado os campos devem ser resetados para o valor atual e voltar o card ao modo de visualização.

O outro botão salva o card, persistindo as informações pela API. Também volta ao modo de visualização em seguida.

Toda decisão de visual é sua. Apenas utilize as duas telas especificadas no requisito 2.

O projeto deve ser colocado em um repositório GITHUB ou equivalente, estar público, e conter um readme.md que explique em detalhes qualquer comando ou configuração necessária para fazer o projeto rodar.

A entrega será apenas a URL do repositório.

### Conceitos a serem avaliados no projeto:
1.Componentes
2.Databinding
3.Diretivas
4.Formulários
5.Rotas
6.Pipes
7.Services e injeção de dependência
8.Observables
9.Requisições HTTP
10.Autenticação e proteção de rotas
11.NgModules
