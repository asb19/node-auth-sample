const express = require("express");
const router = express.Router();

const {addCountryDetails, getCountryDetails} = require('../controller/country.controller')

router.post('/', addCountryDetails)

router.get('/', getCountryDetails)

module.exports = router