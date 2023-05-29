const ApiError = require("../exceptions/api-error");
const BreedModel = require("../models/breed-model");

class UserService {
  async getAllBreeds() {
    const breeds = await BreedModel.find({});
    return breeds;
  }

  async addNewBreed(breed, description) {
    const breedFromDB = await BreedModel.findOne({ breed });
    if (breedFromDB) {
      throw ApiError.BadRequest(`The breed ${breed} is already added.`);
    }
    const breedData = await BreedModel.create({
      breed,
      description,
    });

    return breedData;
  }
}

module.exports = new UserService();
