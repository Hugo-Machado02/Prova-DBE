const PassageiroRepository = require("../repositories/PassageiroRepository");
const VooRepository = require("../repositories/VooRepository");

class PassageiroService {
    constructor() {
        this.passageiroRepository = new PassageiroRepository();
        this.vooRepository = new VooRepository();
    }

    //retorna os Passageiros
    async getPassageiros() {
        return await this.passageiroRepository.getAll();
    }
    async getStatusPassageiros() {
        return await this.passageiroRepository.getUserAllStatus();
    }

    //Adiciona um Novo passageiro
    async addPassageiro(data) {
        data.statusCheckIn = "pendente";

        const verificaCPF = await this.passageiroRepository.getUserCPF(data.cpf);
        if (verificaCPF) {
            return { error: "CPF já cadastrado"}
        }

        if (data.vooId) {
            const vooExiste = await this.vooRepository.getIdVoo(data.vooId);
            if (!vooExiste) {
                return { error: "Voo não encontrado"}
            }
        }

        const resultCadastro = await this.passageiroRepository.newPassageiro(data);
        if (!resultCadastro) {
            return { error: "Cadastro não realizado" };
        }
        return { sucess: true };
    }

    //Edita um passageiro
    async editPassageiro(data) {
        const update = {};

        if(data.id){
            const resultPassageiro = await this.passageiroRepository.getUserId(data.id);
            if(!resultPassageiro){
                return { error: "Passageiro não encontrado" }
            }
        }

        if (data.nome) {
            update.nome = data.nome;
        }

        if (data.cpf) {
            const cpfValidado = data.cpf.replace(/[^0-9]/g, '');
            const verificaCPF = await this.passageiroRepository.getUserCPF(cpfValidado);

            if (verificaCPF) {
                return { error: "CPF já cadastrado"}
            }
            update.cpf = cpfValidado;
        }

        if (data.vooId) {
            const vooExiste = await this.vooRepository.getUserId(data.vooId);
            if (!vooExiste) {
                return { error: "Voo Não encontrado"}
            }
            update.vooId = data.vooId;
        }

        if (data.statusCheckIn) {
            update.statusCheckIn = data.statusCheckIn;
        }

        const opValid = await this.passageiroRepository.updatePassageiro(data.id, update);

        if (!opValid) {
            return { error: "Id Não encontrado"}
        }

        return { sucess: true };
    }

    //Deleta um passageiro
    async deletePassageiro(id) {
        const opValid = await this.passageiroRepository.deletePassageiro(id);
        if (!opValid) {
            return { error: "Passageiro não encontrado" };
        }
        return { sucess: true };
    }


    //Busca Passageiros o Check-In para o passageiro
    async getPassageirosVoo(numVoo) {
        console.log(numVoo)
        const voo = await this.vooRepository.getNumeroVoo(numVoo);
        if(!voo){
            return { error: "Voo não encontrado"}
        }
        return await this.passageiroRepository.getPassageirosVoo(voo._id);
    }

    //configura o Check-In para o passageiro
    async checkInPassageiro(id) {
        if (!id) {
            return {error: "Id não especificado para Check-in"};
        }

        const passageiro = await this.passageiroRepository.findOneById(id);
        if (!passageiro) {
            return { error: "Passageiro não encontrado" }
        }

        const voo = await this.vooRepository.findOneById(passageiro.vooId);
        // Adicione aqui a lógica para verificar o status do voo antes de permitir o check-in
        if (voo.status == "programado") {
            return { error: "O Voo ainda não permite realizar Check-In" }
        }
        if (voo.status == "finalizado"){
            return { error: "Check-in não realizado - o Voo já foi finalizado" }
        }
        // Por enquanto, apenas atualiza o status do check-in
        const updateCheckIn = {statusCheckIn: "Confirmado" }; // Ou outro status desejado
        const opValid = await this.passageiroRepository.update(id, updateCheckIn);
        if (!opValid) {
            return { error: "Erro ao realizar o Check-in!" };
        }
        return { sucess: true };
    }
}

module.exports = new PassageiroService();