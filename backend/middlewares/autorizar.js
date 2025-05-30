const autorizar = (...tiposPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !tiposPermitidos.includes(req.user.tipo)) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    next();
  };
};

module.exports = autorizar;
