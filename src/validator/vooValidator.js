const { checkSchema } = require("express-validator");

module.exports = {
  addVoo: checkSchema({
    numeroVoo: {
      notEmpty: true,
      errorMessage: "Número do voo não especificado",
    },
    
    origem: {
      notEmpty: true,
      errorMessage: "Origem do voo não especificada",
    },
    
    destino: {
      notEmpty: true,
      errorMessage: "Destino do voo não especificado",
    },
    
    dataHoraPartida: {
      notEmpty: true,
      isISO8601: {
        options: { strict: true },
        errorMessage: "Formato de data e hora inválido (esperado ISO8601)",
      },
      toDate: true,
    },
    
    PortaoId: {
        notEmpty: true,
        errorMessage: "Id do portão Não especificado"
    },
  }),

  editVoo: checkSchema({
    id: {
      notEmpty: true,
      errorMessage: "Id voo não especificado",
    },

    numeroVoo: {
      notEmpty: false,
    },

    origem: {
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 2 },
        errorMessage: "O nome do passageiro deve ter no mínimo, 2 caracteres",
      },
    },
    
    destino: {
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 2 },
        errorMessage: "O nome do passageiro deve ter no mínimo, 2 caracteres",
      },
    },
    
    dataHoraPartida: {
      optional: { options: { nullable: true } },
      isISO8601: {
        options: { strict: true },
        errorMessage: "Formato de data e hora inválido (esperado ISO8601)",
      },
      toDate: true,
    },
    
    PortaoId: {
        notEmpty: false,
    },
    
    status: {
        optional: { options: { nullable: true } },
        isIn: {
            options: [["programado", "embarque", "concluido"]],
            errorMessage: "O status do check-in deve ser 'Pendente', 'Embarque', Concluído'"
        },
    },
  }),
  deleteVoo: checkSchema({
    id: {
      notEmpty: true,
      errorMessage: "Id não especificado",
    },
  }),
};
