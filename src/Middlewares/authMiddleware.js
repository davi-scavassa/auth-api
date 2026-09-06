import jwt from "jsonwebtoken";

export function authenticate(request, response, next) {
    const authorization = request.headers.authorization;

    if(!authorization) {
        return response.status(401).json({
            message: "Token não fornecido."
        });
    }

    const [type, token] = authorization.split(" ");

    if(type !== "Bearer" || !token) {
        return response.status(401).json({
            message: "Token não fornecido."
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        request.user = decoded;

        next();

    } catch (error) {
        return response.status(401).json({
            message: "Token inválido ou expirado."
        });
    }
}