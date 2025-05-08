const { checkSchema } = require("express-validator");

module.exports = {
  addPassageiro: checkSchema({
    nome: {
      notEmpty: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "O nome do passageiro deve ter no mínimo, 2 caracteres",
    },
    cpf: {
      notEmpty: true,
      isLength: {
        options: { min: 11, max: 14 },
      },
      errorMessage: "O CPF deve ter até 14 caracteres se possuir pontos e virgulas",
    },
    vooId: {
      notEmpty: true,
      errorMessage: "Id não especificado",
    },
  }),
  
  editPassageiro: checkSchema({
    id: {
      notEmpty: true,
      errorMessage: "Id não especificado",
    },
    nome: {
      notEmpty: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "O nome do passageiro deve ter no mínimo, 2 caracteres",
    },
    cpf: {
      notEmpty: true,
      isLength: {
        options: { min: 11, max: 14 },
      },
      errorMessage: "O CPF deve ter até 14 caracteres se possuir pontos e virgulas",
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
  deletePassageiro: checkSchema({
    id: {
      notEmpty: true,
      errorMessage: "Id não especificado",
    },
  }),
  
};
