const FuncionarioService = require("../services/funcionarioService");
const { validationResult, matchedData } = require("express-validator");

module.exports = {
    getFuncionarios: async (req, res) => {
        const result = await FuncionarioService.getAllFuncionarios();
        if (result) {
            res.status(200).json({ Funcionarios: result });
        } else {
            res.status(500).json({ error: result });
        }
    },

    addFuncionario: async (req, res) => {
       const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        const result = await FuncionarioService.addFuncionario(data);
        
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    },
};