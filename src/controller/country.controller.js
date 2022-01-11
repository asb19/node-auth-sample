const Country = require('../models/country.model')
const ApiError = require('../utils/ApiError')
const Status = require('http-status')

exports.getCountryDetails = async(req,res,next)=>{
    try{
    const data = await Country.find()
    res.status(Status.OK).json({status: Status.OK, data: data })
    next()
    }
    catch(err) {
        next(err)
    }
    
}

exports.addCountryDetails = async (req,res,next) => {
    const data = await Country.insertMany(req.body)
    return res.status(200).json(1,{data: data}) 
}