const { Schema, model } = require("mongoose");

const CatModelSchema = new Schema({
  breed: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

module.exports = new model("Breed", CatModelSchema);
