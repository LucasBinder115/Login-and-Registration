const express = require("express")
const router = express.Router()

router.post("/register", async (req, res, next) => {
    res.send("Página de registro");
});

router.post("/login", async (req, res, next) => {
    res.send("Página de login");
});

router.post("/refresh-token", async (req, res, next) => {
    res.send("Recarregar página");
});

router.delete("/logout", async (req, res, next) => {
    res.send("Sair");
});

module.exports = router