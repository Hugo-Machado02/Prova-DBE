const { checkSchema } = require("express-validator");

module.exports = {
  addPortao: checkSchema({
    codigo: {
      notEmpty: true,
      errorMessage: "Codigo não especificado",
    },
  }),
  editPortao: checkSchema({
    id: {
      notEmpty: true,
      errorMessage: "Id não especificado",
    },
    codigo: {
      notEmpty: true,
      errorMessage: "Codigo não especificado",
    },
    disponivel: {
      notEmpty: true,
      errorMessage: "disponibilidade não especificada",
    },
  }),
};
