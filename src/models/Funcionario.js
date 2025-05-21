const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true},
  cargo: String,
  senha: String
}, { versionKey: false });

const modelName = "funcionarios";

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, modelSchema);
}