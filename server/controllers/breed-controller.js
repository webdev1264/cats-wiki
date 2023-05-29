const breedService = require("../services/breed-service");

class BreedController {
  async getAllBreeds(req, res, next) {
    try {
      const breedData = await breedService.getAllBreeds();
      return res.json(breedData);
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
}

module.exports = new BreedController();
