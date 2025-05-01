const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiRoutes = require("./routers/routers");

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on("Error", (error) => {
  console.log(`Erro: ${error.mensage}`);
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", apiRoutes);

const servico = server.listen(process.env.PORT, () => {
  console.log(`Servidor startado na porta ${servico.address().port }`);
});
