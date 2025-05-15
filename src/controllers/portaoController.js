const PortaoService = require("../services/PortaoService");
const { validationResult, matchedData } = require("express-validator");

module.exports = {
    getPortao: async (req, res) => {
        const result = await PortaoService.getPortoes();
        if (result) {
            res.status(200).json({Portoes: result});
        } else {
            res.status(500).json({ error: result });
        }
    },

    addPortao: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);
        const result = await PortaoService.addPortao(data);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: result.error });
        }
    },

    editPortao: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        const result = await PortaoService.editPortao(data);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: result.error });
        }
    },
};