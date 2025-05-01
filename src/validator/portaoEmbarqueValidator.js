const { checkSchema } = require("express-validator");

module.exports = {
  editAction: checkSchema({
    disponivel: {
      notEmpty: true,
      errorMessage: "disponibilidade não especificada",
    },
  }),
};
