const express = require("express");
const router = express.Router();
const portaoController = require("../controllers/portaoEmbarqueController");
const portaoValidador = require("../validator/portaoEmbarqueValidator")

router.get("/portoesEmbarque", portaoController.getPortao);
router.post("/portoesEmbarque/add", portaoValidador.addPortao, portaoController.addPortao);
router.put("/portoesEmbarque/edicao", portaoValidador.editPortao, portaoController.editPortao);

module.exports = router;