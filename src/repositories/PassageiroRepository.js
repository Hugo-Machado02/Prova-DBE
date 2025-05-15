const PassageiroModel = require("../models/Passageiro");

class PassageiroRepository {
  async getAll() {
    return await PassageiroModel.find();
  }

  async getUserCPF(cpf) {
    return await PassageiroModel.findOne({ cpf });
  }

  async getUserAllStatus() {
    return await PassageiroModel.find().select('nome statusCheckIn -_id');
  }

  async getUserId(id) {
    return await PassageiroModel.findById(id);
  }

  async newPassageiro(data) {
    const newPassageiro = new PassageiroModel(data);
    return await newPassageiro.save();
  }

  async updatePassageiro(id, updateData) {
    return await PassageiroModel.findOneAndUpdate({ _id: id }, { $set: updateData });
  }

  async deletePassageiro(id) {
    return await PassageiroModel.findByIdAndDelete(id);
  }
    
  async getPassageirosVoo(vooId) {
    return await PassageiroModel.find({ vooId: vooId });
  }
}

module.exports = PassageiroRepository;