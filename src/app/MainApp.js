const express = require("express")
const ControllerAuth = require("../controllers/ControllerAuth")

const {  RouteSpotify } = require("../routes")

const app = express()

app.use(express.json())

app.get("/login", ControllerAuth.authenticateUser())
app.get("/callback", ControllerAuth.getUserToken())
app.use(ControllerAuth.authenticate())

app.use("/api", RouteSpotify)

module.exports = app