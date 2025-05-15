const express = require("express");
const router = express.Router();
const passageiroController = require("../controllers/passageiroController");
const passageiroValidator = require("../validator/passageiroValidator")

router.get("/passageiros", passageiroController.getPassageiros);
router.get("/:numeroVoo/passageiros/", passageiroController.getPassageirosVoo);
router.get("/passageiros/status", passageiroController.getStatusPassageiros);
router.post("/passageiros/add", passageiroValidator.addPassageiro, passageiroController.addPassageiro);
router.put("/passageiros/edicao", passageiroValidator.editPassageiro, passageiroController.editPassageiro);
router.delete("/passageiros/del", passageiroValidator.deletePassageiro, passageiroController.deletePassageiro);

module.exports = router;