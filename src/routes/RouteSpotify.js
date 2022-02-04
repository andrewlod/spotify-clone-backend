const {Router} = require("express")
const ControllerAuth = require("../controllers/ControllerAuth")
const {ControllerSpotify} = require("./../controllers")

const router = Router()

router.post("/", ControllerSpotify.handleRequest())
router.post("/tracks", ControllerSpotify.handleAlbumTracks())
router.post("/album", ControllerSpotify.handleAlbum())
module.exports = router