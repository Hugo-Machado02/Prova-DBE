class FuncionarioRepository {
    async getAll() {
      return await FuncionarioModel.find();
    }
  
    async getByEmail(email) {
      return await FuncionarioModel.findOne({ email });
    }
  
    async getBasicInfo() {
      return await FuncionarioModel.find().select('nome cargo');
    }
  
    async create(data) {
      const novoFuncionario = new FuncionarioModel(data);
      return await novoFuncionario.save();
    }
  
    async updateByEmail(email, updateData) {
      return await FuncionarioModel.findOneAndUpdate(
        { email },
        { $set: updateData },
        { new: true }
      );
    }
  
    async deleteByEmail(email) {
      return await FuncionarioModel.findOneAndDelete({ email });
    }
}