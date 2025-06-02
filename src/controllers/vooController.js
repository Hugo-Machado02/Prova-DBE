const VooService = require("../services/VooService");
const { validationResult, matchedData } = require("express-validator");

module.exports = {
    getVoo: async (req, res) => {
        const result = await VooService.getVoos();
        if (result) {
            res.status(200).json({ voos: result });
        } else {
            res.status(500).json({ error: "Nenhum Voo Encontrado" });
        }
    },

    getVooHoje: async (req, res) => {
        const result = await VooService.getVoosHoje();
        if (result) {
         res.status(200).json({ voos: result });
        } else {
        res.status(500).json({ error: result });
        }
    },

    addVoo: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);
        const result = await VooService.addVoo(data);

        if (result) {
        res.status(200).json(result);
        } else {
        res.status(400).json({ error: result });
        }
    },

    editVoo: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        const result = await VooService.editVoo(data);

        if (result.success) {
        res.status(200).json(result);
        } else {
        res.status(400).json({ error: result.error });
        }
    },

    deleteVoo: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req)
        console.log(data.id)

        const result = await VooService.deleteVoo(data.id);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: result.error });
        }
    },
};