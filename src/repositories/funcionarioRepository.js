const FuncionarioModel = require("../models/Funcionario");
class FuncionarioRepository {
    async getAll() {
        return await FuncionarioModel.find();
    }

    async getByEmail(email) {
        return await FuncionarioModel.findOne({ email });
    }

    async create(data) {
        const novoFuncionario = new FuncionarioModel(data);
        return await novoFuncionario.save();
    }
}

module.exports = new FuncionarioRepository();