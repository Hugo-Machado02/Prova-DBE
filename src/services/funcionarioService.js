const FuncionarioRepository = require("../repositories/FuncionarioRepository");
const bcrypt = require("bcrypt");

class FuncionarioService {
    
    async getAllFuncionarios() {
        return await FuncionarioRepository.getAll();
    }
    
    async addFuncionario(data) {
        console.log(data)
        const funcionarioExistente = await FuncionarioRepository.getByEmail(data.email);
        if (funcionarioExistente) {
            return { error: "E-mail já cadastrado" };
        }

        data.password = await bcrypt.hash(data.password, 10);
        console.log(data.password)

        const resultado = await FuncionarioRepository.create(data)
        if (!resultado) {
            return { error: "Cadastro não realizado" };
        }

        return { success: true };
    }
}

module.exports = new FuncionarioService();