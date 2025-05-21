const express = require("express");
const router = express.Router();
const vooController = require("../controllers/vooController");
const vooValidator = require("../validator/vooValidator")
const { authMiddleware, adminValidate } = require("../middleware/authMiddleware")

router.get("/voos", vooController.getVoo);
router.post("/voos/add", authMiddleware, adminValidate, vooValidator.addVoo, vooController.addVoo);
router.get("/voos/hoje", vooController.getVooHoje);
router.put("/voos/edicao", authMiddleware, vooValidator.editVoo, vooController.editVoo);
router.delete("/voos/del", vooValidator.deleteVoo, vooController.deleteVoo);

module.exports = router;