const mongoose = require("mongoose");
const PortaoEmbarque = require("../models/PortaoEmbarque");
const { validationResult, matchedData } = require("express-validator");

module.exports = {
    getPortao: async (req, res) => {
        let portoes = await PortaoEmbarque.find();
        res.json({ portoes });
    },

    addPortao: async (req, res) => {
            const data = matchedData(req);
            data.disponivel = false;
    
            if (data.codigo) {
                const emailCheck = await PortaoEmbarque.findOne({ codigo: data.codigo });
                if (emailCheck) {
                    res.json({ error: "o código do portão já existe!" });
                    return;
                }
            }
    
            const newPortao = new PortaoEmbarque(data);
    
            const operationAdd = await newPortao.save();
        
            if (!operationAdd) {
                res.json({ error: "Cadastro não realizado!" });
                return;
            }
            res.json({ sucess: true });
        },
    

    editPortao: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }
        const data = matchedData(req);
        let updateData = {};
        console.log(data.id);

        if (!data.id) {
            return res.status(400).json({ error: "Id não especificado!" });
        }

        if (data.codigo) {
            updateData.codigo = data.codigo;
        }

        if (data.disponivel) {
            updateData.disponivel = data.disponivel;
        }
        const opValid = await PortaoEmbarque.findOneAndUpdate(
            { _id: data.id },
            { $set: updateData }
          );
          if (!opValid) {
            res.json({ error: "Id não encontrado!" });
            return;
          }
          res.json({ sucess: true });
    }
};
