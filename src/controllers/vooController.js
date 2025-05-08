const mongoose = require("mongoose")
const VooModel = require("../models/Voo");
const portaoModel = require("../models/PortaoEmbarque");
const { validationResult, matchedData } = require("express-validator");
const PortaoEmbarque = require("../models/PortaoEmbarque");


module.exports = {
    getVoo: async (req, res) => {
        let voos = await VooModel.find();
        res.json({ voos })
    },

    getVooHoje: async (req, res) => {
        const inicioDia = new Date();
        inicioDia.setHours(0, 0, 0, 0);

        const fimDia = new Date();
        fimDia.setHours(23, 59, 59, 999);

        const voos = await VooModel.find({
            status: "programado",
            dataHoraPartida: {
                $gte: inicioDia,
                $lte: fimDia
            }
        });

        res.json({ voos });
    },
    
    addVoo: async (req, res) => {
        const data = matchedData(req);
        data.status = "programado";
    
        if (data.numeroVoo) {
            const vooExistente = await VooModel.findOne({ numeroVoo: data.numeroVoo });
            if (vooExistente) {
                return res.json({ error: "Já tem um voo cadastrado com esse número" });
            }
        }
    
        const portao = await PortaoEmbarque.findOne({ _id: data.PortaoId });
        if (!portao) {
            return res.json({ error: "Portão de embarque não encontrado." });
        }
    
        if (portao.vinculado) {
            return res.json({ error: "O portão já está vinculado a outro Voo" });
        }
    
        const newVoo = new VooModel(data);
        const operationAdd = await newVoo.save();
    
        if (!operationAdd) {
            return res.json({ error: "Cadastro não realizado!" });
        }
    
        await PortaoEmbarque.findOneAndUpdate(
            { _id: data.PortaoId },
            { vinculado: true }
        );
    
        res.json({ success: true });
    },

    editVoo: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }
        const data = matchedData(req);
        let updateData = {};
        console.log(data.id);

        if (data.id) {
            console.log(data.id)
        }
        if (data.numeroVoo) {
            updateData.numeroVoo = data.numeroVoo;
        }
        if (data.origem) {
            updateData.origem = data.origem;
        }
        if (data.destino) {
            updateData.destino = data.destino;
        }
        if (data.dataHoraPartida) {
            updateData.dataHoraPartida = data.dataHoraPartida;
        }
        if (data.PortaoId) {
            const resultPortao = await portaoModel.findOne({ _id: data.PortaoId });
            if (!resultPortao) {
              res.json({ error: "Portão Não encontrado! Por favor especifique outro" });
              return;
            }
            updateData.PortaoId = data.PortaoId;
        }
        if (data.status) {
            updateData.status = data.status;
        }

        const opValid = await VooModel.findOneAndUpdate( { _id: data.id }, { $set: updateData });
        if (!opValid) {
            res.json({ error: "Id não encontrado!" });
            return;
        }
        res.json({ sucess: true });
    },

    deleteVoo: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        res.json({
            error: errors.mapped(),
        });
        return;
        }
    
        const data = matchedData(req);

        const operation = await VooModel.findByIdAndDelete(data.id)
        if (!operation) {
            res.json({ error: "Voo não encontrado!" });
            return;
        }
        res.json({ sucess: true });
    },
}