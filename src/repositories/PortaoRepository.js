const PortaoModel = require("../models/PortaoEmbarque");

class PortaoRepository {
    //busca os Portões
    async getAll() {
        return await PortaoModel.find();
    }

    //Busca um Portão por ID
    async getPortaoId(id) {
        return await PortaoModel.findById(id);
    }

    //Busca um Portão por ID
    async getPortaoCodigo(codigo) {
        return await PortaoModel.findOne({ codigo });
    }

    //Adiciona um novo Portão
    async newPortao(data) {
        const createPortaoEmbarque = new PortaoModel(data);
        return await createPortaoEmbarque.save();
    }

    //Altera um Portão
    async updatePortao(id, updateData) {
        return await PortaoModel.findOneAndUpdate({ _id: id }, { $set: updateData });
    }
}

module.exports = PortaoRepository;