require("dotenv").config()
const { SV_PORT } = process.env

const { MainApp } = require("./app")

MainApp.listen(SV_PORT)