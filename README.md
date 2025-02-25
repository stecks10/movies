# Movies App

Este é um aplicativo de filmes desenvolvido com React, TypeScript e Vite. Ele utiliza várias bibliotecas modernas para fornecer uma experiência de usuário rica e interativa.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápida e moderna.
- **Tailwind CSS**: Framework de CSS utilitário para estilização rápida.
- **Axios**: Cliente HTTP baseado em Promises para fazer requisições.

- **Shadcnui**: Biblioteca de componentes para construção de interfaces de usuário.

## Design

O design do aplicativo pode ser visualizado no Figma através do seguinte link: [Figma Design](https://www.figma.com/design/yhag2s5vJBXMgyGabBIA3Y/Cubos---Movies?node-id=756-1355&t=sdsMLbBagyQE2Dwb-0)

## API TMDB

A API do TMDB será utilizada para buscar os dados dos filmes. A documentação pode ser encontrada no [site oficial do TMDB](https://developer.themoviedb.org/docs/getting-started).

### Passos para Configuração

1. **Crie uma conta no TMDB:**

- Acesse o [site do TMDB](https://www.themoviedb.org/signup) e crie uma conta.

2. **Gere uma chave de autenticação:**

- Após criar a conta, vá para a seção de [API Keys](https://www.themoviedb.org/settings/api) e gere sua chave de API.

3. **Configure o arquivo `.env`:**

- Copie o conteúdo do arquivo `.env.local.example` para um novo arquivo chamado `.env`.
- Adicione sua chave de API ao arquivo `.env`:
  ```env
  VITE_TMDB_API_KEY=sua_chave_api_aqui
  ```

## Como Baixar e Executar o Aplicativo

Siga os passos abaixo para baixar e executar o aplicativo localmente:

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/stecks10/movies.git
   cd movies
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```

## Licença

Este projeto está licenciado por Cubos.
