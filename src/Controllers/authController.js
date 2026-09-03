import bcrypt from "bcrypt";

const users = [];

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
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return response.status(409).json({
            message: "O email já está em uso."
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //CRIAR USUARIOS
    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    console.log(users);

    return response.status(201).json({
        message: "Usuário registrado com sucesso.",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
}
