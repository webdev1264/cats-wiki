const { Router } = require("express");
const breedController = require("../controllers/breed-controller");

const router = new Router();

router.get("/breeds/all", breedController.getAllBreeds);
router.get("/breeds/:breed", breedController.getOneBreed);
router.get("/img/:imgName", breedController.getBreedImg);
router.post("/breeds", breedController.addNewBreed);
router.delete("/breeds", breedController.deleteBreed);
router.put("/breeds", breedController.updateBreed);

module.exports = router;
