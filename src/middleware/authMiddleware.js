const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secret");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido!" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if(err){
            return res.status(403).json({error: "token inválido!"});
        }
        req.user = {
            id: decoded.id,
            nome: decoded.nome,
            cargo: decoded.cargo,
        };
        next()
    })
};

const adminValidate = (req, res, next) => {
  if (!req.user || req.user.cargo !== "admin") {
        return res.status(403).json({ error: "Acesso negado! O usuário não é um administrador!." });
    }
  next();
};

module.exports = { authMiddleware, adminValidate };
