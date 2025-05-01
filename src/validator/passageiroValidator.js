const { checkSchema } = require("express-validator");

module.exports = {
  editAction: checkSchema({
    name: {
      notEmpty: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "O nome do passageiro deve ter no mínimo, 2 caracteres",
    },
    cpf: {
      notEmpty: true,
      isLength: {
        options: { min: 11, max: 11 },
      },
      errorMessage: "O CPF deve ter 11 digitos (. e - não contam como digitos)",
    },
    vooId: {
      notEmpty: true,
      errorMessage: "Id não especificado",
    },
    statusCheckIn: {
        notEmpty: {
            errorMessage: "O status do check-in é obrigatório"
        },
        isIn: {
            options: [["Pendente", "Realizado"]],
            errorMessage: "O status do check-in deve ser 'Pendente' ou 'Realizado'"
        }
    },
  }),
};
