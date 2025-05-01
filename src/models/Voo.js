const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  numeroVoo: String,
  origem: String,
  destino: String,
  dataHoraPartida: String,
  PortaoId: String,
  status: {
    type: String,
    enum: ["programado", "embarque", "concluido"],
    required: true,
  },
});

const modelName = "voo";

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, modelSchema);
}
