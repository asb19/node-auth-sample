const express = require("express");
const router = express.Router();

const {addCountryDetails, getCountryDetails} = require('../controller/country.controller')

/**
 * @swagger
 * /:
 *   post:
 *     description:  Endpoint for everything
 */
router.post('/', addCountryDetails)


/**
 * @swagger
 * /api/country:
 *   get:
 *     description:  get list of countries
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Object Id 
 *                         example: ""
 *                       name:
 *                         type: string
 *                         description: name of country
 *                         example: "India"
 *                       code:
 *                         type: string
 *                         description: phone code
 *                         example: ""
 *                       flag:
 *                         type: string
 *                         description: icon url 
 *                         example: ""
 *                       
 * 
 */
router.get('/', getCountryDetails)

module.exports = router