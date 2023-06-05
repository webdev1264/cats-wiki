const BreedDto = require("../dtos/breed-dto");
const ApiError = require("../exceptions/api-error");
const breedService = require("../services/breed-service");
const isValidObjId = require("../utils");
const path = require("path");

class BreedController {
  async getAllBreeds(req, res, next) {
    try {
      const breedsData = await breedService.getAllBreeds();
      return res.json(breedsData);
    } catch (e) {
      next(e);
    }
  }
  async getOneBreed(req, res, next) {
    try {
      const { breed } = req.params;
      const breedData = await breedService.getOneBreed(breed);
      return res.json(breedData);
    } catch (e) {
      next(e);
    }
  }

  async getBreedImg(req, res, next) {
    try {
      const { imgName } = req.params;
      const rootDir = path.dirname(require.main.filename); //getting root folder address
      return res.sendFile(`${rootDir}/public/img/${imgName}`, (err) => {
        if (err) {
          throw ApiError.Error(err.status, err.message);
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async addNewBreed(req, res, next) {
    try {
      const { breed, description } = req.body;
      const breedData = await breedService.addNewBreed(breed, description);
      return res.json(breedData);
    } catch (e) {
      next(e);
    }
  }

  async deleteBreed(req, res, next) {
    try {
      const { id } = req.query;
      if (!isValidObjId(id)) {
        throw ApiError.BadRequest("Bad request. ID is not correct");
      }
      const breedData = await breedService.deleteBreed(id);
      return res.json(breedData);
    } catch (e) {
      next(e);
    }
  }

  async updateBreed(req, res, next) {
    try {
      const { id } = req.body;
      const breed = req.body;
      const breedDto = new BreedDto(breed);
      if (!isValidObjId(id)) {
        throw ApiError.BadRequest("Bad request. ID is not correct.");
      }
      const breedData = await breedService.updateBreed(id, { ...breedDto });
      res.json(breedData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BreedController();
