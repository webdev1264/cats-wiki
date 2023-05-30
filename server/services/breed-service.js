const ApiError = require("../exceptions/api-error");
const BreedModel = require("../models/breed-model");

class UserService {
  async getAllBreeds() {
    const breedsData = await BreedModel.find({});
    return breedsData;
  }

  async getOneBreed(breed) {
    const breedData = await BreedModel.findOne({
      breed: { $regex: new RegExp("^" + breed + "$", "i") }, // ^ and $ to do exact match instead of partial
    });
    return breedData;
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

  async deleteBreed(id) {
    const breedData = await BreedModel.deleteOne({ _id: id });
    if (!breedData.deletedCount) {
      throw ApiError.BadRequest(`The breed with id ${id} wasn't found.`);
    }
    return breedData;
  }

  async updateBreed(id, breedDto) {
    const breedData = await BreedModel.findByIdAndUpdate(id, {
      ...breedDto,
    });
    if (!breedData) {
      throw ApiError.BadRequest(`The breed with id ${id} wasn't found.`);
    }
    return breedData;
  }
}

module.exports = new UserService();
