const { checkSchema } = require("express-validator");

module.exports = {
  addFuncionario: checkSchema({
    nome: {
      notEmpty: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "O nome do funcionário deve ter, no mínimo, 2 caracteres",
    },

    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "email inválido",
    },

    cargo: {
      notEmpty: true,
      errorMessage: "Cargo não especificado",

    },

    password: {
      notEmpty: {
        errorMessage: "A senha é obrigatória"
      },
      isLength:{
        options: { min: 5},
        errorMessage: "A senha deve ter, no mínimo, 5 caracteres",
      },
    },
  }),
  
};
