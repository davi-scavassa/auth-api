import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export async function register(request, response) {
    const { name, email, password } = request.body;

    // VERIFICAR CAMPOS OBRIGATÓRIOS
    if (!name || !email || !password) {
        return response.status(400).json({
            message: "Todos os campos são obrigatórios."
        });
    }

    //VERIFICAR FORMATO DO EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return response.status(400).json({
            message: "O email fornecido não é válido."
        });
    }

    //VERFIFICAR TAMANHO DA SENHA
    if (password.length < 6) {
        return response.status(400).json({
            message: "A senha deve ter no mínimo 6 caracteres."
        });
    }

    //VERIFICAR SE O EMAIL JÁ EXISTE
    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (userExists) {
        return response.status(409).json({
            message: "O email já está em uso."
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //CRIAR USUARIOS
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    });

    return response.status(201).json({
        message: "Usuário registrado com sucesso.",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
}

export async function login(request, response) {
    const { email, password } = request.body;

    //VERIFICAR CAMPOS OBRIGATÓRIOS
    if (!email || !password) {
        return response.status(400).json({
            message: "Email e senha são obrigatórios."
        });
    }

    //PROCURAR USUÁRIO
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    
    if (!user) {
        return response.status(401).json({
            message: "Email ou senha inválidos."
        });
    }

    //COMPARAR SENHA COM HASH
    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        return response.status(401).json({
            message: "Email ou senha inválidos."
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    //LOGIN BEM-SUCEDIDO
    return response.status(200).json({
        message: "Login bem-sucedido.",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
}

export async function profile(request, response) {

    const user = await prisma.user.findUnique({
        where: {
            id: request.user.id
        }
    });

    if (!user) {
        return response.status(404).json({
            message: "Usuário não encontrado."
        });
    }

    return response.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email
    });
}