const { Schema, model } = require("mongoose");

const CharacteristicsSchema = new Schema({
  adaptability: { type: String, required: true },
  affectionLevel: { type: String, required: true },
  childFriendly: { type: String, required: true },
  grooming: { type: String, required: true },
  intelligence: { type: String, required: true },
  healthIssues: { type: String, required: true },
  socialNeeds: { type: String, required: true },
  strangerFriendly: { type: String, required: true },
});

const BreedSchema = new Schema({
  breed: { type: String, required: true, unique: true },
  previewImg: { type: String, required: true },
  imgs: { type: [String] },
  description: { type: String, required: true },
  temperament: { type: String, required: true },
  origin: { type: String, required: true },
  lifeSpan: { type: String, required: true },
  characteristics: {
    type: CharacteristicsSchema,
    required: true,
  },
});

module.exports = new model("Breed", BreedSchema);
