const mongoose = require("mongoose");
const Passageiro = require("../models/Passageiro");
//const { validationResult, matchedData } = require("express-validator");
//const bcrypt = require("bcrypt");

module.exports = {

    //Busca todos os passageiros
    getPassageiros: async (req, res) => {
        let passageiro = await Passageiro.find();
        res.json({ passageiro });
    }
};
