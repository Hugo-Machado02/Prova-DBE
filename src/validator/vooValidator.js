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
    
    status: {
        notEmpty: true,
        errorMessage: "Id do portão não especificado",
        isIn: {
            options: [["programado", "embarque", "concluído"]],
        },
        errorMessage: "O status do check-in deve ser 'Pendente', 'Embarque', Concluído'"
    },
  }),

  editVoo: checkSchema({
    id: {
      notEmpty: true,
      errorMessage: "Id voo não especificado",
    },
    
    status: {
        notEmpty: true,
        errorMessage: "Id do portão não especificado",
        isIn: {
            options: [["Programado", "Embarque", "Concluído"]],
        },
        errorMessage: "O status do check-in deve ser 'Pendente', 'Embarque', Concluído'"
    },
  }),
  deleteVoo: checkSchema({
    id: {
      notEmpty: true,
      errorMessage: "Id não especificado",
    },
  }),
};
