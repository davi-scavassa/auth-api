import express from "express";
import authRoutes from "./Routes/authRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    return response.json({
        message: "Auth API funcionando!"
    });
});

app.use("/auth", authRoutes);

export default app;