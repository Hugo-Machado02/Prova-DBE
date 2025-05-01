const mongoose = require("mongoose");
const PortaoEmbarque = require("../models/PortaoEmbarque");
const { validationResult, matchedData } = require("express-validator");

module.exports = {
    getPortao: async (req, res) => {
        let portoes = await PortaoEmbarque.find();
        res.json({ portoes });
    },

    editPortao: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }
        const data = matchedData(req);
        let updateData = {};

        if (!data.codigo) {
            return res.status(400).json({ error: "Código não foi enviado!" });
          }

        if (data.disponivel) {
            updateData.disponivel = data.disponivel;
        }
        const opValid = await PortaoEmbarque.findOneAndUpdate(
            { codigo: data.codigo },
            { $set: updateData }
          );
          if (!opValid) {
            res.json({ error: "Código não encontrado!" });
            return;
          }
          res.json({ sucess: true });
    }
};
