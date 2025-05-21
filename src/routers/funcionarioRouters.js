const express = require("express");
const router = express.Router();
const funcionarioController = require("../controllers/funcionarioController");
const funcionarioValidator = require("../validator/funcionarioValidator")

router.get("/funcionarios", funcionarioController.getFuncionarios);
router.post("/funcionarios/add", funcionarioValidator.addFuncionario, funcionarioController.addFuncionario);
router.put("/funcionarios/edicao", funcionarioValidator.editFuncionario, funcionarioController.editFuncionario);
router.delete("/funcionarios/del", funcionarioValidator.deleteFuncionario, funcionarioController.deleteFuncionario);

module.exports = router;