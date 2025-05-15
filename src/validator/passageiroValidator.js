const { checkSchema } = require("express-validator");
const { cpf: cpfValidator } = require('cpf-cnpj-validator');

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
      notEmpty: {
        errorMessage: "O CPF é obrigatório"
      },
      isLength: {
        options: { min: 11, max: 14 },
        errorMessage: "O CPF deve ter entre 11 e 14 caracteres",
      },
      custom: {
        options: (value) => {
          if (!cpfValidator.isValid(value)) {
            console.log(value);
            return false;
          }
          return true;
        },
        errorMessage: "CPF Inválido",
      },
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
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 2 },
        errorMessage: "O nome do passageiro deve ter no mínimo, 2 caracteres",
      },
    },
    cpf: {
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 11, max: 14 },
        errorMessage: "O CPF deve ter entre 11 e 14 caracteres",
      },
      custom: {
        options: (value) => {
          if (!cpfValidator.isValid(value)) {
            console.log(value);
            return false;
          }
          return true;
        },
        errorMessage: "CPF Inválido",
      },
    },
    vooId: {
      optional: { options: { nullable: true } },
    },
    statusCheckIn: {
      optional: { options: { nullable: true } },
      notEmpty: true,
      isIn: {
        options: [["pendente", "realizado"]],
      },
    },
  }),
  deletePassageiro: checkSchema({
    id: {
      notEmpty: true,
      errorMessage: "Id não especificado",
    },
  }),
  
};
