const express = require("express");
const router = express.Router();
const funcionarioController = require("../controllers/funcionarioController");
const authController = require("../controllers/authController");
const funcionarioValidator = require("../validator/funcionarioValidator")
// const authValidator = require("../validator/funcionarioValidator")

router.get("/funcionarios", funcionarioController.getFuncionarios);
router.post("/funcionarios/add", funcionarioValidator.addFuncionario, funcionarioController.addFuncionario);
router.post("/login", authController.authLogin);

module.exports = router;