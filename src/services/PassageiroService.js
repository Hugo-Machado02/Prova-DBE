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

        const resultPassageiro = await this.passageiroRepository.getUserId(data.id);
        if(!resultPassageiro){
            return { error: "Passageiro não encontrado" }
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
            if(data.statusCheckIn == "realizado"){
                const voo = await this.vooRepository.getIdVoo(resultPassageiro.vooId);
                if (voo.status == "programado") {
                    return { error: "O Voo ainda não permite realizar Check-In" }
                }
                if (voo.status == "finalizado"){
                    return { error: "Check-in não realizado - o Voo já foi finalizado" }
                }
            }
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
}

module.exports = new PassageiroService();