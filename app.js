const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config(); // Corrigido: .config() é uma função e precisa ser chamada

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Corrigido: Use template literals (crase)
});