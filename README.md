# 🔐 Auth API

API REST de autenticação desenvolvida com Node.js e Express.

O projeto possui cadastro e login de usuários, hash de senhas com bcrypt, autenticação utilizando JWT, rotas protegidas, persistência de dados com Prisma ORM + SQLite e testes automatizados com Vitest e Supertest.

## 🚀 Tecnologias

- Node.js
- Express
- Prisma ORM
- SQLite
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
- Verificação de email duplicado
- Hash de senhas com bcrypt
- Persistência dos usuários em banco de dados
- Login de usuários
- Geração de token JWT
- Middleware de autenticação
- Rota de perfil protegida
- Tratamento de erros
- Testes automatizados
- Banco separado para testes

## 📁 Estrutura do projeto

```text
auth-api/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── Controllers/
│   │   └── authController.js
│   ├── Middlewares/
│   │   └── authMiddleware.js
│   ├── Routes/
│   │   └── authRoutes.js
│   ├── generated/
│   │   └── prisma/
│   ├── lib/
│   │   └── prisma.js
│   ├── app.js
│   └── server.js
├── tests/
│   └── auth.test.js
├── .env.example
├── .gitignore
├── package.json
├── prisma7.config.ts
└── README.md
```

## ⚙️ Como executar

Clone o repositório:

```bash
git clone https://github.com/davi-scavassa/auth-api.git
```

Entre na pasta:

```bash
cd auth-api
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.example` e configure:

```env
JWT_SECRET=sua_chave_secreta
DATABASE_URL="file:./dev.db"
```

Aplique as migrations:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Inicie o servidor:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

## 📡 Endpoints

### Cadastro

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

Em caso de sucesso, a API retorna um token JWT.

### Perfil

```http
GET /auth/profile
```

Essa rota é protegida e exige o token:

```http
Authorization: Bearer SEU_TOKEN
```

## 💾 Banco de dados

O projeto utiliza SQLite com Prisma ORM.

O modelo de usuário possui:

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
}
```

Os usuários permanecem armazenados mesmo após o servidor ser reiniciado.

## 🧪 Testes automatizados

Os testes utilizam:

- Vitest
- Supertest
- Banco SQLite separado para testes

Execute:

```bash
npm test
```

Atualmente o projeto possui:

```text
9 testes automatizados
9 testes passando
```

O ambiente de testes utiliza um banco separado do banco de desenvolvimento. Isso permite limpar e recriar os dados necessários sem afetar os dados utilizados durante o desenvolvimento.

## 🔐 Segurança

As senhas nunca são armazenadas em texto puro.

Antes de salvar um usuário:

```text
Senha
  ↓
bcrypt
  ↓
Hash
  ↓
SQLite
```

Durante o login, `bcrypt.compare()` compara a senha informada com o hash armazenado.

Após um login válido, a API gera um JWT com tempo de expiração.

O segredo utilizado para assinar os tokens fica armazenado em uma variável de ambiente e não é enviado ao GitHub.

## 📚 Conceitos praticados

Este projeto foi desenvolvido para praticar:

- APIs REST
- Métodos e status HTTP
- Controllers e rotas
- Middlewares
- Programação assíncrona
- Hash de senhas
- Autenticação JWT
- Variáveis de ambiente
- ORM
- Modelagem de dados
- Migrations
- Persistência com banco de dados
- Separação entre ambiente de desenvolvimento e testes
- Testes de integração

## 🔄 Fluxo de autenticação

```text
Cadastro
   ↓
Validação
   ↓
bcrypt
   ↓
Prisma
   ↓
SQLite

Login
   ↓
Busca usuário no banco
   ↓
bcrypt.compare()
   ↓
JWT
   ↓
Bearer Token
   ↓
Middleware
   ↓
Rota protegida
```

## 🚧 Possíveis melhorias

- Refresh tokens
- Recuperação de senha
- Confirmação de email
- Roles e permissões
- PostgreSQL para produção
- Deploy da API
- CI para execução automática dos testes