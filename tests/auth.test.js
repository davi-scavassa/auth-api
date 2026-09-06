import { config } from "dotenv";

config({
    path: ".env.test",
    override: true
});

const { describe, test, expect, beforeAll } = await import("vitest");
const request = (await import("supertest")).default;
const app = (await import("../src/app.js")).default;

const prisma = (await import("../src/lib/prisma.js")).default;

describe ("Testes de autenticação", ()  => {

    beforeAll(async () => {
        await prisma.user.deleteMany();
    });

    //TESTES DA ROTA DE REGISTRO DE USUÁRIO (POST /auth/register)
    //TESTE DE REGISTRO DE USUÁRIO
    test("Deve cadastrar um usuário", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Davi",
                email: "davi@example.com",
                password: "123456"
            });

        expect(response.status).toBe(201);

        expect(response.body.user.email).toBe("davi@example.com");
    });

    //TESTE DE CADASTRO SEM TODOS OS CAMPOS
    test("Não deve cadastrar sem todos os campos", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Davi",
                email: "davi@example.com"
                // senha não enviada
            });

        expect(response.status).toBe(400);
    });

    //TESTE DE EMAIL INVÁLIDO
    test("Não deve cadastrar com email inválido", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Davi",
                email: "daviexample.com",
                password: "123456"
            });

        expect(response.status).toBe(400);
    });

    //TESTE DE SENHA MENOR QUE 6 CARACTERES
    test("Não deve cadastrar com senha menor que 6 caracteres", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Davi",
                email: "davi@example.com",
                password: "12345"
            });

        expect(response.status).toBe(400);
    });

    //TESTES DA ROTA DE LOGIN (POST /auth/login)
    //TESTE DE LOGIN COM DADOS VÁLIDOS
    test("Deve realizar login com dados válidos", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "davi@example.com",
                password: "123456"
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    //TESTE DE LOGIN COM SENHA INCORRETA
    test("Não deve realizar login com senha incorreta", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "davi@example.com",
                password: "wrongpassword"
            });

        expect(response.status).toBe(401);
    });

    //TESTES DA ROTA DE PERFIL (GET /auth/profile)
    //TESTE DE ACESSO AO PERFIL SEM TOKEN
    test("Não deve acessar o perfil sem token", async () => {
        const response = await request(app)
            .get("/auth/profile");

        expect(response.status).toBe(401);
    });

    //TESTE DE ACESSO AO PERFIL COM TOKEN INVÁLIDO
    test("Não deve acessar o perfil com token inválido", async () => {
        const response = await request(app)
            .get("/auth/profile")
            .set("Authorization", "Bearer tokeninvalido");

        expect(response.status).toBe(401);
    });

    //TESTE DE ACESSO AO PERFIL COM TOKEN VÁLIDO
    test("Deve acessar o perfil com token válido", async () => {

        // Primeiro, faça login para obter o token
        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email: "davi@example.com",
                password: "123456"
            });

        const token = loginResponse.body.token;

        // Agora, usamos o JWT para acessar a rota protegida
        const profileResponse = await request(app)
            .get("/auth/profile")
            .set("Authorization", `Bearer ${token}`);

        expect(profileResponse.status).toBe(200);
        expect(profileResponse.body.email).toBe("davi@example.com");
    });
});
