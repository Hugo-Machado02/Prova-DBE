const express = require("express");
const router = express.Router();
const funcionarioController = require("../controllers/funcionarioController");
const authController = require("../controllers/authController");
const funcionarioValidator = require("../validator/funcionarioValidator")

router.post("/login", authController.authLogin);
router.get("/funcionarios", funcionarioController.getFuncionarios);
router.post("/funcionarios/add", funcionarioValidator.addFuncionario, funcionarioController.addFuncionario);

module.exports = router;