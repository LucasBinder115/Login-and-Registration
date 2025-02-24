const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config(); // Correto: .config() é uma função e precisa ser chamada
const AuthRoute = require("./Routes/Auth_route"); // Certifique-se de que o caminho do arquivo está correto
require("./helpers/init_mongodb")
const app = express();

// Middleware
app.use(morgan("dev")); // Adicionei o middleware morgan para logs de requisições
app.use(express.json()); // Middleware para parsear JSON no body das requisições

// Rota de teste
app.get("/", async (req, res, next) => {
    res.send("Hello From Express");
});

// Rotas de autenticação
app.use("/auth", AuthRoute); // Corrigido: Use "/auth" em vez de "./auth"

// Rota 404 (para rotas não encontradas)
app.use(async (req, res, next) => {
    next(createError.NotFound());
});

// Tratamento de erros
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Correto: Use template literals (crase)
});