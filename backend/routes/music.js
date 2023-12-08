const express = require("express")
const router = express.Router()

const MusicController = require("../controllers/musicController")

const upload = require("../config/multer")

router.post("/create", upload.single("file"), MusicController.create)
router.get("/getAll", MusicController.findAll)
router.get("/getSearch/:search", MusicController.getSearch)
router.delete("/:id", MusicController.remove)
router.get("/:id", MusicController.getOne)
router.patch("/favorite/:id", MusicController.favorite)

module.exports = router