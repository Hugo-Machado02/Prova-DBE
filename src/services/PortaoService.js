const PortaoRepository = require("../repositories/PortaoRepository");

class PortaoEmbarqueService {
  constructor() {
    this.PortaoRepository = new PortaoRepository();
  }

  async getPortoes() {
    return await this.PortaoRepository.getAll();
  }

  async addPortao(data) {
    data.disponivel = true;

    if (!data.codigo) {
      return { error: "Código do portão não especificado." };
    }

    const portaoExistente = await this.PortaoRepository.getPortaoCodigo(data.codigo);
    if (portaoExistente) {
      return { error: "O código do portão já existe!" };
    }

    const operationAdd = await this.PortaoRepository.newPortao(data);
    if (!operationAdd) {
      return { error: "Cadastro do portão não realizado!" };
    }
    return { success: true };
  }

  async editPortao(data) {
    if (!data.id) {
      return { success: false, error: "Id não especificado!" };
    }

    const updateData = {};
    if (data.codigo) {
      updateData.codigo = data.codigo;
    }

    if (data.disponivel) {
      updateData.disponivel = data.disponivel;
    }

    const opValid = await this.PortaoRepository.updatePortao(data.id, updateData);
    if (!opValid) {
      return { success: false, error: "Portão não encontrado!" };
    }
    return { success: true };
  }
}

module.exports = new PortaoEmbarqueService();