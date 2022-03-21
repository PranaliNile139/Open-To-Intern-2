const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const validateBody = require('../validation/validation');

const createIntern = async function (req, res) {
    try {
        const { name, email, mobile, collegeName, isDeleted } = req.body; 
        const requestBody = req.body;

        // Validate body
        if (!validateBody.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Please provide body of intern" });
        }

        // Validate name
        if (!validateBody.isValid(name)) {
            return res.status(400).send({ status: false, msg: "Please provide name" });
        }

        // Validate collegeName
        if (!validateBody.isValid(collegeName)) {
            return res.status(400).send({ status: false, msg: "Please provide college Name" });
        }

        // Validate email
        if (!validateBody.isValid(email)) {
            return res.status(400).send({ status: false, msg: "Please provide Email id" });;
        }

        // Validate syntax of Email
        if (!validateBody.isValidSyntaxOfEmail(email)) {
            return res.status(404).send({ status: false, msg: "Please provide a valid Email Id" });
        }

         // Validate mobile
         if (!validateBody.isValid(mobile)) {
            return res.status(400).send({ status: false, msg: "Please provide mobile number" });
        }

        // Validate mobile number
        if (!validateBody.isValidMobileNum(mobile)) {
            return res.status(400).send({ status: false, msg: 'Please provide a valid Mobile number.' })
        }

        // Checking duplicate entry of intern
        let isDBexists = await internModel.find();
        let dbLen = isDBexists.length
        if (dbLen != 0) {
            //Cheking the provided email id is already exists or not in the database
            const DuplicateEmailId = await internModel.find({ email: email });
            const emailFound = DuplicateEmailId.length;
            if (emailFound != 0) {
                return res.status(400).send({ status: false, msg: "This Email Id already exists" });
            }
            const duplicateMob = await internModel.findOne({ mobile: mobile })
            // const duplicateMobCount = duplicateMob.length
            if (duplicateMob) {
                return res.status(400).send({ status: false, msg: "This mobile number already exists" });
            }
        }
        // Cheking the email id is duplicate or not       
        if (isDeleted === true) {
            return res.status(400).send({ status: false, msg: "At the time of new entry no data should be deleted" });
        }
        
        let collegeData = await collegeModel.findOne({ name: collegeName })
        if (!collegeData) {
            res.status(400).send({ status: false, msg: "This college name does not exists." })
        }

        // Finally the registration of intern is successful
        let collegeId = collegeData._id
        let data = { name, email, mobile, collegeId, isDeleted }
        const internData = await internModel.create(data);

        res.status(201).send({ status: true, message: 'Intern Registration successful', data: internData });
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


module.exports.createIntern = createIntern;