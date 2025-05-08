const express = require("express");
const router = express.Router();

const portaoRouters = require("./portaoRouters");
const vooRouters = require("./vooRouters");
const passageiroRouters = require("./passageiroRouters");

router.get("/valida-rotas", (req, res) => {
  res.json({ retorno: "true" });
});

//usa as rotas do portao
router.use("/", portaoRouters)
//usa as rotas do voo
router.use("/", vooRouters)
//usa as rotas do Passageiro
router.use("/", passageiroRouters)

module.exports = router;