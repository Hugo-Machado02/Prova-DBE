const VooRepository = require("../repositories/VooRepository");
const PortaoRepository = require("../repositories/PortaoRepository");

class VooService {
  constructor() {
    this.vooRepository = new VooRepository();
    this.portaoRepository = new PortaoRepository();
  }

  async getVoos() {
    return await this.vooRepository.getAll();
  }

  async getVoosHoje() {
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);

    const fimDia = new Date();
    fimDia.setHours(23, 59, 59, 999);

    return await this.vooRepository.getProgramadosHoje(inicioDia, fimDia);
  }

  async addVoo(data) {
    data.status = "programado";
    
    if (!data.numeroVoo) {
      return { error: "Número do voo não especificado." };
    }
    
    const vooExistente = await this.vooRepository.getNumeroVoo(data.numeroVoo);
    if (vooExistente) {
      return { error: "Já existe um voo cadastrado com esse número." };
    }
    
    if (!data.PortaoId) {
      return { error: "ID do portão de embarque não especificado." };
    }
    
    const portao = await this.portaoRepository.getPortaoId(data.PortaoId);
    if (!portao) {
      return { error: "Portão de embarque não encontrado." };
    }
    
    if (!portao.disponivel) {
      return { error: "O portão já está vinculado a outro Voo." };
    }

    const operationAdd = await this.vooRepository.newVoo(data);
    if (!operationAdd) {
      return { error: "Cadastro do voo não realizado!" };
    }

    await this.portaoRepository.updatePortao(data.PortaoId, { disponivel: false });
    return { success: true };
  }

  async editVoo(data) {
    const update = {};

    if (data.numeroVoo) {
      update.numeroVoo = numeroVoo;
    }
    if (data.origem) {
      update.origem = data.origem;
    }
    if (data.destino) {
      update.destino = data.destino;
    }
    if (data.dataHoraPartida) {
      update.dataHoraPartida = data.dataHoraPartida;
    }
    if (data.PortaoId) {
      const portao = await this.portaoRepository.findById(data.PortaoId);
      if (!portao) {
        return { success: false, error: "Portão de embarque não encontrado." };
      }
      update.PortaoId = data.PortaoId;
    }

    if (data.status) {
      if(data.status == "programado" || data.status == "embarque"){
        update.status = data.status;
      }
      else{
        update.status = data.status;
      }
    }

    const opValid = await this.vooRepository.updateVoo(data.id, update);
    if (!opValid) {
      return { success: false, error: "Voo não encontrado!" };
    }

    if(data.status == "concluido"){
      await this.portaoRepository.updatePortao(data.PortaoId, { disponivel: true });
    }
    return { success: true };
  }

  async deleteVoo(id) {
    const voo = await this.vooRepository.findById(id);
    if (!voo) {
      return { success: false, error: "Voo não encontrado!" };
    }

    // Desvincular o portão se estiver vinculado
    if (voo.PortaoId) {
      await this.portaoRepository.update(voo.PortaoId, { disponivel: false });
    }

    const operation = await this.vooRepository.delete(id);
    if (!operation) {
      return { success: false, error: "Erro ao deletar o voo!" };
    }
    return { success: true };
  }
}

module.exports = new VooService();