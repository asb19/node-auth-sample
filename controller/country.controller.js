const Country = require('../models/country.model')

exports.getCountryDetails = async(req,res,next)=>{
    const data = await Country.find()
    return res.status(200).json({
        type: "success",
        message: "got country data",
        data: data
    })
}

exports.addCountryDetails = async (req,res,next) => {
    const data = await Country.insertMany(req.body)
    return res.status(200).json({
        type: "success",
        message: "added country data",
        data: data
    }) 
}