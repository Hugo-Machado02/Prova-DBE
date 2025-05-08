const mongoose = require("mongoose");
const PassageiroModel = require("../models/Passageiro");
const VooModel = require("../models/Voo");
const { validationResult, matchedData } = require("express-validator");
const { addPassageiro } = require("../validator/passageiroValidator");

module.exports = {
    //Busca todos os passageiros
    getPassageiros: async (req, res) => {
        let passageiro = await PassageiroModel.find();
        res.json({ passageiro });
    },
    addPassageiro: async (req, res) => {
        const data = matchedData(req);
        data.statusCheckIn = "Pendente"

        if (data.cpf) {
            const emailCheck = await PassageiroModel.findOne({ cpf: data.cpf });
            if (emailCheck) {
                res.json({ error: "CPF já cadastrado!" });
                return;
            }
        }
        if (data.vooId) {
            const emailCheck = await VooModel.findOne({ _id: data.vooId });
            if (!emailCheck) {
                res.json({ error: "Voo não encontrado!" });
                return;
            }
        }

        const newPassageiro = new PassageiroModel(data);

        const operationAdd = await newPassageiro.save();
    
        if (!operationAdd) {
            res.json({ error: "Cadastro não realizado!" });
            return;
        }
        res.json({ sucess: true });
    },

    editPassageiro: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }
        const data = matchedData(req);
        let updateData = {};
        console.log(data.id);

        if (data.nome) {
            updateData.nome = data.nome;
        }
        if (data.cpf) {
            const resultPortao = await VooModel.findOne({ cpf: data.cpf });
            if (!resultPortao) {
                res.json({ error: "CPF já cadastrado!" });
                return;
            }
            updateData.vooId = data.vooId;
            updateData.cpf = data.cpf;
        }
        if (data.vooId) {
            const resultPortao = await VooModel.findOne({ _id: data.vooId });
            if (!resultPortao) {
                res.json({ error: "Portão Não encontrado! Por favor especifique outro" });
                return;
            }
            updateData.vooId = data.vooId;
        }
        if (data.statusCheckIn) {
            updateData.statusCheckIn = data.statusCheckIn;
        }

        const opValid = await PassageiroModel.findOneAndUpdate( { _id: data.id }, { $set: updateData });
        if (!opValid) {
            res.json({ error: "Id não encontrado!" });
            return;
        }
        res.json({ sucess: true });
    },
    deletePassageiro: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        res.json({
            error: errors.mapped(),
        });
        return;
        }
    
        const data = matchedData(req);

        const operation = await PassageiroModel.findByIdAndDelete(data.id)
        if (!operation) {
            res.json({ error: "Passageiro não encontrado!" });
            return;
        }
        res.json({ sucess: true });
    },
};
