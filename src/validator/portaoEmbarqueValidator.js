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
      notEmpty: false,
    },
    disponivel: {
      optional: { options: { nullable: true } },
      notEmpty: true,
      isIn: {
        options: [[true, false]],
      },
    },
  }),
};
