const { checkSchema } = require("express-validator");

module.exports = {
  editAction: checkSchema({
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
      errorMessage: "Hora da partida não especificada",
    },
    
    PortãoId: {
        notEmpty: true,
        errorMessage: "Id do portão não especificado",
        isIn: {
            options: [["Programado", "Embarque", "Concluído"]],
        },
        errorMessage: "O status do check-in deve ser 'Pendente', 'Embarque', Concluído'"
    },
  }),
};
