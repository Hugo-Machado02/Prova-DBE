const VooModel = require("../models/Voo");

class VooRepository {
  async getAll() {
    return await VooModel.find();
  }

  async getIdVoo(id) {
    return await VooModel.findById(id);
  }

  async getNumeroVoo(numeroVoo) {
    return await VooModel.findOne({ numeroVoo });
  }

  async getProgramadosHoje(inicioDia, fimDia) {
    return await VooModel.find({
      status: "programado",
      dataHoraPartida: {
        $gte: inicioDia,
        $lte: fimDia,
      },
    });
  }

  async newVoo(data) {
    const createVoo = new VooModel(data);
    return await createVoo.save();
  }

  async updateVoo(id, updateData) {
    return await VooModel.findOneAndUpdate({ _id: id }, { $set: updateData });
  }

  async deleteVoo(id) {
    return await VooModel.findByIdAndDelete(id);
  }
}

module.exports = VooRepository;