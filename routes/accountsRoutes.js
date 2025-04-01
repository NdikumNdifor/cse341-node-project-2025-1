const express = require("express")
const router = express.Router()

const accountController = require("../controllers/registerAccountController")

router.post("/accounts", accountController.registerAccount)



module.exports = router