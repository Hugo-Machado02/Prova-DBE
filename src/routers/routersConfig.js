const express = require("express");
const router = express.Router();

const portaoRouters = require("./portaoRouters");
const vooRouters = require("./vooRouters");
const passageiroRouters = require("./passageiroRouters");
const funcionarioRouters = require("./funcionarioRouters");

router.get("/valida-rotas", (req, res) => {
  res.json({ retorno: "true" });
});

//usa as rotas do funcionario
router.use("/", funcionarioRouters)
//usa as rotas do portao
router.use("/", portaoRouters)
//usa as rotas do voo
router.use("/", vooRouters)
//usa as rotas do Passageiro
router.use("/", passageiroRouters)

module.exports = router;