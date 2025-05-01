const mongoose = require("mongoose")
const Voo = require("../models/Voo");

module.exports = {
    getVoo: async (req, res) => {
        let voos = await Voo.find();
        res.json({ voos })
    }
}