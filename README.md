# 🔐 Auth API

API REST de autenticação desenvolvida com Node.js e Express.

O projeto implementa cadastro e login de usuários, criptografia de senhas com bcrypt, autenticação utilizando JWT e proteção de rotas através de middleware.

Também possui testes automatizados de integração utilizando Vitest e Supertest.

## 🚀 Tecnologias

- Node.js
- Express
- bcrypt
- JSON Web Token (JWT)
- dotenv
- Vitest
- Supertest

## ✨ Funcionalidades

- Cadastro de usuários
- Validação de campos obrigatórios
- Validação de email
- Validação de senha
- Verificação de email já cadastrado
- Hash de senhas com bcrypt
- Login de usuários
- Geração de token JWT
- Middleware de autenticação
- Rota de perfil protegida
- Tratamento de erros
- Testes automatizados

## 📁 Estrutura do projeto

```text
auth-api/
├── src/
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── app.js
│   └── server.js
├── tests/
│   └── auth.test.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Como executar

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd auth-api
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```env
JWT_SECRET=sua_chave_secreta
```

Inicie o servidor em desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

## 📡 Endpoints

### Cadastrar usuário

```http
POST /auth/register
```

Exemplo:

```json
{
  "name": "Davi",
  "email": "davi@example.com",
  "password": "123456"
}
```

### Login

```http
POST /auth/login
```

Exemplo:

```json
{
  "email": "davi@example.com",
  "password": "123456"
}
```

O login retorna um token JWT que pode ser utilizado para acessar rotas protegidas.

### Perfil

```http
GET /auth/profile
```

Requer:

```http
Authorization: Bearer SEU_TOKEN
```

## 🧪 Testes

Execute:

```bash
npm test
```

A aplicação possui testes para cadastro, validações, login e autenticação JWT.

Atualmente:

```text
9 testes automatizados
9 testes passando
```

## 🔐 Segurança

As senhas não são armazenadas em texto puro. Antes de serem armazenadas, são transformadas em hash utilizando bcrypt.

As rotas protegidas utilizam JSON Web Token (JWT) para autenticação.

O segredo utilizado para assinar os tokens é armazenado em uma variável de ambiente e não é enviado ao repositório.

## 📚 Conceitos praticados

Este projeto foi desenvolvido para praticar conceitos de desenvolvimento backend, incluindo:

- APIs REST
- Métodos HTTP
- Status HTTP
- Rotas e controllers
- Middlewares
- Hash de senhas
- Autenticação JWT
- Variáveis de ambiente
- Testes de integração

## ⚠️ Observação

Atualmente os usuários são armazenados em memória. Isso significa que os dados são apagados sempre que o servidor é reiniciado.

Uma futura evolução do projeto será adicionar persistência utilizando banco de dados.