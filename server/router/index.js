const { Router } = require("express");
const catController = require("../controllers/breed-controller");

const router = new Router();

router.get("/breeds", catController.getAllBreeds);
router.post("/breeds", catController.addNewBreed);

module.exports = router;
