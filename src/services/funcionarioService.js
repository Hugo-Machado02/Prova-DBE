const FuncionarioRepository = require("../repositories/FuncionarioRepository");

class FuncionarioService {
    constructor() {
        this.funcionarioRepository = new FuncionarioRepository();
    }
    
    async getFuncionarios() {
        return await this.funcionarioRepository.getAll();
    }
    
    async addFuncionario(data) {
        const funcionarioExistente = await this.funcionarioRepository.getByEmail(data.email);
        if (funcionarioExistente) {
            return { error: "E-mail já cadastrado" };
        }

        const resultado = await this.funcionarioRepository.create(data);
        if (!resultado) {
            return { error: "Cadastro não realizado" };
        }

        return { success: true };
    }
    
    async editFuncionario(data) {
        if (!data.email) {
            return { error: "E-mail não informado" };
        }

        const funcionario = await this.funcionarioRepository.getByEmail(data.email);
        if (!funcionario) {
            return { error: "Funcionário não encontrado" };
        }

        const update = {};

        if (data.nome) update.nome = data.nome;
        if (data.cargo) update.cargo = data.cargo;
        if (data.senha) update.senha = data.senha;

        const atualizado = await this.funcionarioRepository.updateByEmail(data.email, update);

        if (!atualizado) {
            return { error: "Erro ao atualizar funcionário" };
        }

        return { success: true };
    }
    
    async deleteFuncionario(email) {
        const deletado = await this.funcionarioRepository.deleteByEmail(email);

        if (!deletado) {
            return { error: "Funcionário não encontrado" };
        }

        return { success: true };
    }
}

module.exports = new FuncionarioService();