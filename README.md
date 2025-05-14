# Documentação da API - Sistema Financeiro

![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue)
![Express](https://img.shields.io/badge/Express-4%2B-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-7%2B-green)
![Zod](https://img.shields.io/badge/Zod-3%2B-orange)
![JWT](https://img.shields.io/badge/JWT-Auth-yellow)

## Índice

- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Rotas de Autenticação](#rotas-de-autenticação)
  - [POST /api/auth/signup](#post-apiauthsignup)
  - [POST /api/auth/login](#post-apiauthlogin)
- [Rotas de Transações](#rotas-de-transações)
  - [POST /api/transactions](#post-apitransactions)
  - [GET /api/transactions](#get-apitransactions)
- [Erros Comuns](#erros-comuns)

## Visão Geral

Essa API foi desenvolvida para controlar as transações financeiras, como entradas e saídas de dinheiro, e possibilitar a autenticação de usuários. A API é construída utilizando Express.js, Zod para validação de dados e MongoDB para armazenamento dos dados.

## Instalação

### Pré-requisitos

- Node.js
- MongoDB
- TypeScript

### Passos para Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-repositorio/empbank-backend.git
   ```

2. Instale as dependências:

   ```bash
   cd empbank-backend
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis:

   ```env
   MONGO_URI=<sua-uri-do-mongo>
   PORT=3000
   ```

4. Para iniciar o servidor em ambiente de desenvolvimento:

   ```bash
   npm run start:dev
   ```

5. Para gerar a build e iniciar o servidor em produção:
   ```bash
   npm run build
   npm start
   ```

---

## Rotas de Autenticação

### POST /api/auth/signup

Registra um novo usuário.

#### Body:

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@dominio.com",
  "password": "senha123"
}
```

#### Respostas:

- **201 Created**: Usuário registrado com sucesso.

  ```json
  {
    "msg": "Usuário criado com sucesso"
  }
  ```

- **400 Bad Request**: Dados inválidos ou não fornecidos corretamente.

#### Validação:

- O nome é obrigatório e não pode estar vazio.
- O email deve ser válido.
- A senha deve ter pelo menos 8 caracteres.

### POST /api/auth/login

Realiza o login do usuário.

#### Body:

```json
{
  "email": "usuario@dominio.com",
  "password": "senha123"
}
```

#### Respostas:

- **200 OK**: Login bem-sucedido, retorna um token de autenticação.

  ```json
  {
    "msg": "Login realizado com sucesso",
    "token": "<token>"
  }
  ```

- **401 Unauthorized**: Dados de login incorretos.

#### Validação:

- O email deve ser válido.
- A senha deve ter pelo menos 8 caracteres.

---

## Rotas de Transações

### POST /api/transactions

Cria uma nova transação financeira (entrada ou saída).

#### Body:

```json
{
  "title": "Título da transação",
  "amount": 500,
  "day": "2025-05-14",
  "transactionType": "income",
  "category": "salário"
}
```

#### Respostas:

- **201 Created**: Transação criada com sucesso.

  ```json
  {
    "msg": "Transação criada com sucesso"
  }
  ```

- **400 Bad Request**: Dados inválidos ou não fornecidos corretamente.

#### Validação:

- O título da transação é obrigatório.
- O valor (amount) é obrigatório.
- O dia (day) é obrigatório e deve ser uma data válida.
- O tipo de transação (transactionType) deve ser "income" ou "expense".
- A categoria (category) é obrigatória.

### GET /api/transactions

Recupera todas as transações do usuário autenticado.

#### Respostas:

- **200 OK**: Retorna a lista de transações.

  ```json
  [
    {
      "title": "Salário",
      "amount": 2000,
      "day": "2025-05-14",
      "transactionType": "income",
      "category": "salário"
    },
    {
      "title": "Compra de supermercado",
      "amount": 150,
      "day": "2025-05-13",
      "transactionType": "expense",
      "category": "alimentação"
    }
  ]
  ```

- **401 Unauthorized**: O usuário não está autenticado.

---

## Erros Comuns

### 400 Bad Request

Erro ao enviar dados inválidos ou ausentes para as rotas que exigem corpo na requisição. Verifique os dados fornecidos.

### 401 Unauthorized

Erro ao tentar acessar rotas protegidas sem fornecer um token válido. Verifique se o token está presente e é válido.

### 404 Not Found

Erro ao tentar acessar uma rota que não existe.

### 500 Internal Server Error

Erro inesperado no servidor. Se persistir, entre em contato com o suporte.

