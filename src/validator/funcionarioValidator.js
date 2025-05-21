const { checkSchema } = require("express-validator");
const { addFuncionario } = require("../controllers/funcionarioController");

module.exports = {
  addFuncionario: checkSchema({
    nome: {
      notEmpty: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "O nome do funcionário deve ter, no mínimo, 2 caracteres",
    },

    // OU

    //nome: {
    //  notEmpty: {
    //    errorMessage: "O nome do funcionário não pode estar vazio"
    //},
    //  isLength: {
    //    options: {
    //      min: 2
    //    },
    //    errorMessage: "O nome do funcionário deve ter, no mínimo, 2 caracteres"
    //  },
    //},

    //se for esse segundo tem que alterar nos outros debaixo

    email: {
      notEmpty: true,
      isLength: {
        options: { min: 10},
      },
      errorMessage: "O e-mail deve ter, no mínimo, 10 caracteres",
    },
    senha: {
      notEmpty: {
        errorMessage: "A senha é obrigatória"
      },
      isLength:{
        options: { min: 8},
      },
      errorMessage: "A senha deve ter, no mínimo, 8 caracteres",
    },
    cargo: {
      notEmpty: true,
      errorMessage: "Cargo não especificado",
    },
  }),
  
  editFuncionario: checkSchema({
    nome: {
        notEmpty: true,
        isLength: {
          options: { min: 2 },
        },
        errorMessage: "O nome do funcionário deve ter, no mínimo, 2 caracteres",
      },
      email: {
        notEmpty: true,
        isLength: {
          options: { min: 10},
        },
        errorMessage: "O e-mail deve ter, no mínimo, 10 caracteres",
      },
      senha: {
        notEmpty: {
          errorMessage: "A senha é obrigatória"
        },
        isLength:{
          options: { min: 8},
        },
        errorMessage: "A senha deve ter, no mínimo, 8 caracteres",
      },
      cargo: {
        notEmpty: true,
        errorMessage: "Id não especificado",
      },
    }),
  deleteFuncionario: checkSchema({
    email: {
      notEmpty: true,
      errorMessage: "E-mail não especificado",
    },
  }),
  
};
