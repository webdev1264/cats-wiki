const { Router } = require("express");
const catController = require("../controllers/breed-controller");

const router = new Router();

router.get("/breeds/all", catController.getAllBreeds);
router.get("/breeds/:breed", catController.getOneBreed);
router.post("/breeds", catController.addNewBreed);
router.delete("/breeds", catController.deleteBreed);
router.put("/breeds", catController.updateBreed);

module.exports = router;
