const express = require("express");
const router = express.Router();
const passageiroValidator = require("../validator/passageiroValidator")
const portaoValidator = require("../validator/portaoEmbarqueValidator")

const passageiroController = require("../controllers/passageiroController");
const vooController = require("../controllers/vooController");
const portaoEmbarqueController = require("../controllers/portaoEmbarqueController");

router.get("/ping", (req, res) => {
  res.json({ retorno: "true" });
});

router.get("/passageiro", passageiroController.getPassageiros);
router.get("/voos", vooController.getVoo);
router.get("/portaoEmbarque", portaoEmbarqueController.getPortao);
router.put("/portaoEmbarqueUpdate", portaoValidator.editAction, portaoEmbarqueController.editPortao);
//router.put("/passageiroUpdate", userValidator.editAction, UserController.editUser);

module.exports = router;