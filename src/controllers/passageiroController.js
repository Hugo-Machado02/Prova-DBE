const PassageiroService = require("../services/PassageiroService");
const { validationResult, matchedData } = require("express-validator");

module.exports = {
    getPassageiros: async (req, res) => {
        const result = await PassageiroService.getPassageiros();
        if (result) {
            res.status(200).json({ Passageiros: result });
        } else {
            res.status(500).json({ error: result });
        }
    },

    getStatusPassageiros: async (req, res) => {
        const result = await PassageiroService.getStatusPassageiros();
        if (result) {
            res.status(200).json({ StatusCheckIn: result });
        } else {
            res.status(500).json({ error: result });
        }
    },

    addPassageiro: async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ error: erros.mapped() });
        }

        const data = matchedData(req);
        const result = await PassageiroService.addPassageiro(data);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    },

    editPassageiro: async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ error: erros.mapped() });
        }

        const data = matchedData(req);

        const result = await PassageiroService.editPassageiro(data);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: result });
        }
    },

    deletePassageiro: async (req, res) => {
        const erros = validationResult(req);
            if (!erros.isEmpty()) {
        return res.status(400).json({ error: erros.mapped() });
        }

        const data = matchedData(req)

        const result = await PassageiroService.deletePassageiro(data.id);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: result });
        }
    },

    getPassageirosVoo: async (req, res) => {
        const { numeroVoo } = req.params;
        console.log(numeroVoo);

        const result = await PassageiroService.getPassageirosVoo(numeroVoo);
        if (result) {
            res.status(200).json({ "Passageiros - Voo" : result });
        } else {
            res.status(500).json({ error: result });
        }
    },

    checkInPassageiro: async (req, res) => {
        const data = matchedData(req)

        const result = await PassageiroService.checkInPassageiro(data.id);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: result });
        }
    },
};