const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config(); // Corrigido: .config() é uma função e precisa ser chamada
const AuthRoute = require("./Routes/Auth_route")

const app = express();

app.get("/", async (req, res, next) => {
    res.send("Hello From Express");
});

app.use("./auth", AuthRoute)

app.use(async (req, res, next) => {
    next(createError.NotFound())
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Corrigido: Use template literals (crase)
});