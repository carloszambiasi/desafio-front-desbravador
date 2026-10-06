# GitHub Repository Explorer

Aplicação desenvolvida como desafio técnico Front-End para a **Desbravador Software**.

O projeto permite buscar usuários do GitHub, visualizar informações do perfil, consultar seus repositórios, alterar a ordenação da listagem e acessar os detalhes de cada repositório.

## Aplicação publicada

A aplicação está disponível em:

https://desafio-front-desbravador-sage.vercel.app/

## Repositório

https://github.com/carloszambiasi/desafio-front-desbravador

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- React Router
- Axios
- Bootstrap
- GitHub REST API
- Vercel

## Funcionalidades

- Busca de usuários do GitHub
- Visualização das informações do perfil
- Exibição de avatar, nome, bio, seguidores e usuários seguidos
- Exibição da quantidade de repositórios públicos
- Listagem dos repositórios do usuário
- Ordenação dos repositórios por:
  - Mais estrelas
  - Menos estrelas
  - Nome A-Z
  - Nome Z-A
- Página de detalhes do repositório
- Exibição de estrelas, forks, linguagem e outras informações do repositório
- Link para o perfil original no GitHub
- Link para o repositório original no GitHub
- Estados de carregamento
- Tratamento de erros da API
- Tratamento de usuário e repositório não encontrados
- Página 404
- Layout responsivo utilizando Bootstrap
- Paginação das requisições de repositórios

## Rotas

### Página inicial

```text
/
```

Permite pesquisar um usuário do GitHub.

### Perfil do usuário

```text
/user/:username
```

Exibe as informações do usuário e seus repositórios.

### Detalhes do repositório

```text
/repository/:owner/:repo
```

Exibe informações detalhadas do repositório selecionado.

## API

A aplicação utiliza a **GitHub REST API**.

Os principais endpoints utilizados são:

```text
GET /users/:username
GET /users/:username/repos
GET /repos/:owner/:repo
```

A comunicação com a API é centralizada utilizando uma instância do Axios.

## Estrutura do projeto

```text
src/
├── components/
│   ├── ErrorMessage/
│   ├── Header/
│   ├── Loading/
│   ├── RepositoryCard/
│   ├── RepositoryList/
│   ├── SearchForm/
│   └── UserProfile/
│
├── hooks/
│   ├── useGithubRepositories.ts
│   ├── useGithubRepository.ts
│   └── useGithubUser.ts
│
├── pages/
│   ├── Home/
│   ├── NotFound/
│   ├── Repository/
│   └── User/
│
├── routes/
│   └── AppRoutes.tsx
│
├── services/
│   └── githubApi.ts
│
├── styles/
│   └── global.css
│
├── types/
│   └── github.ts
│
├── App.tsx
└── main.tsx
```

## Organização da aplicação

A aplicação foi dividida em camadas com responsabilidades específicas.

### Components

Contém os componentes reutilizáveis da interface, como cards de repositório, formulário de pesquisa, estados de carregamento e mensagens de erro.

### Pages

Contém as páginas relacionadas às rotas da aplicação.

### Hooks

Centraliza a lógica de carregamento dos dados da API e o gerenciamento dos estados relacionados às requisições.

### Services

Responsável pela comunicação com a API do GitHub através do Axios.

### Types

Contém as interfaces TypeScript utilizadas para representar os dados retornados pela API.

### Routes

Centraliza a configuração das rotas utilizando React Router.

## Ordenação dos repositórios

Por padrão, os repositórios são apresentados em ordem decrescente de estrelas.

O usuário também pode alterar a ordenação para:

- Menos estrelas
- Nome A-Z
- Nome Z-A

A ordenação é realizada no client-side sem necessidade de realizar uma nova requisição à API.

## Tratamento de erros

A aplicação possui tratamento para diferentes situações, incluindo:

- Usuário não encontrado
- Repositório não encontrado
- Falha de conexão com a API
- Limite de requisições da API do GitHub
- Rotas inexistentes

## Responsividade

O layout foi desenvolvido utilizando o sistema de grid e componentes do **Bootstrap**, permitindo a utilização da aplicação tanto em dispositivos desktop quanto mobile.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/carloszambiasi/desafio-front-desbravador.git
```

Acesse a pasta da aplicação:

```bash
cd desafio-front-desbravador/desafio-front-desbravador
```

Instale as dependências:

```bash
npm install
```

## Executando localmente

Execute:

```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento e exibirá no terminal o endereço local da aplicação.

## Build de produção

Para gerar o build:

```bash
npm run build
```

## Preview do build

Para testar o build de produção localmente:

```bash
npm run preview
```

## Fluxo Git

Durante o desenvolvimento foi utilizado um fluxo baseado em branches:

```text
feature/* → develop → main
```

Onde:

- `feature/*` — desenvolvimento isolado das funcionalidades
- `develop` — integração e homologação
- `main` — versão estável utilizada em produção

As funcionalidades foram desenvolvidas em branches separadas e posteriormente integradas através de Pull Requests.

## Deploy

A aplicação foi publicada utilizando **Vercel**.

Produção:

https://desafio-front-desbravador-sage.vercel.app/

## Autor

**Carlos Alexandre Zambiasi**