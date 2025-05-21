const mongoose = require("mongoose");
const Funcionario = require("../models/Funcionario");
const { validationResult, matchedData } = require("express-validator");

module.exports = {
    getFuncionario: async (req, res) => {
        try {
            const funcionarios = await Funcionario.find();
            res.json({ funcionarios });
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar funcionários." });
        }
    },

    addFuncionario: async (req, res) => {
        try {
            const data = matchedData(req);

            if (!data.email) {
                return res.status(400).json({ error: "E-mail não identificado" });
            }

            const emailCheck = await Funcionario.findOne({ email: data.email });
            if (emailCheck) {
                return res.status(400).json({ error: "Este e-mail já está cadastrado!" });
            }

            const newFuncionario = new Funcionario(data);
            const operationAdd = await newFuncionario.save();

            if (!operationAdd) {
                return res.status(500).json({ error: "Cadastro não realizado!" });
            }

            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: "Erro ao cadastrar funcionário." });
        }
    },

    editFuncionario: async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.mapped() });
            }

            const data = matchedData(req);

            if (!data.email) {
                return res.status(400).json({ error: "E-mail não especificado!" });
            }

            if (!data.nome) {
                return res.status(400).json({ error: "Nome não especificado!" });
            }

        const opValid = await Funcionario.findOneAndUpdate(
            { email },
            { $set: fieldsToUpdate },
            { new: true }
        );

        if (!opValid) {
            return res.status(404).json({ error: "E-mail não encontrado!" });
        }

        res.json({ success: true });
    }
};