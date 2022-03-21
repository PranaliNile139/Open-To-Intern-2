const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const validator = require("email-validator");

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}


const isValidMobileNum = function (value) {
    if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value.trim()))) {
        return false
    }
    return true
}


const isValidSyntaxOfEmail = function (value) {
    if (!(validator.validate(value))) {
        return false
    }
    return true
}



const createCollege = async function (req, res) {
    try {
        const { name, fullName, logoLink, isDeleted } = req.body;
        const requestBody = req.body;

        const collegeval = name.split(" ");
        const abbrevation = collegeval.length
        if (abbrevation > 1) {
            return res.status(400).send({ status: false, msg: "Abbreviation college name should be in a single word" });
        }

        if (!validateBody.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, msg: "Please provide college body" });
        }

        if (!validateBody.isValid(name)) {
            return res.status(400).send({ status: false, msg: "Please provide college name or college field" });
        }

        if (!validateBody.isValid(fullName)) {
            return res.status(400).send({ status: false, msg: "Please provide Full college Name" });
        }

        if (!validateBody.isValid(logoLink)) {
            return res.status(400).send({ status: false, msg: "Please provide logo link " });
        }

        if (isDeleted === true) {
            return res.status(400).send({ status: false, msg: "At the time of new entry isDeleted should be default value" });
        }
        const collegeData = await collegeModel.create(requestBody);
        res.status(201).send({ status: true, message: `College Registered Succesfully`, data: collegeData });
    }
    
        catch (err) {
            console.log("This is the error :", err.message)
            res.status(500).send({ msg: "Error", error: err.message })
        }
    
    }


    module.exports.createCollege = createCollege