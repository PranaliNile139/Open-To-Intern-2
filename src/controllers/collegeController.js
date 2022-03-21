const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const validateBody = require('../validation/validation');

const createCollege = async function (req, res) {
    try {
        const { name, fullName, logoLink, isDeleted } = req.body;
        const requestBody = req.body;

        //Validate body
        if (!validateBody.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, msg: "Please provide college body" });
        }

        //Validate name
        if (!validateBody.isValid(name)) {
            return res.status(400).send({ status: false, msg: "Please provide college name" });
        }

         //Validate the link
         if (!validateBody.isValid(logoLink)) {
            return res.status(400).send({ status: false, msg: "Please provide logo link " });
        }

        // Validate fullname of college
        if (!validateBody.isValid(fullName)) {
            return res.status(400).send({ status: false, msg: "Please provide Full college Name or fullName field " });
        }


        // Abbrevation must be a single word
        const collegeval = name.split(" ");
        const len = collegeval.length
        if (len > 1) {
            return res.status(400).send({ status: false, msg: "Abbreviated college name should be in a single word" });
        }
        


        // Cheking duplicate Entry Of College 
        let isDBexists = await collegeModel.find();
        let DBlength = isDBexists.length

        if (DBlength != 0) {
            // Duplicate fullName i.e College Name
            const duplicateCollegeName = await collegeModel.findOne({ fullName: fullName });
            if (duplicateCollegeName) {
                return res.status(400).send({ msg: "This college name is already exists" });
            }

            // Duplicate Logo Link
            const duplicateLogolink = await collegeModel.findOne({ logoLink: logoLink })
            if (duplicateLogolink) {
                res.status(400).send({ status: false, msg: 'This logo link belongs to other college.' })
            }
        }
        // isDeleted should be false
        if (isDeleted === true) {
            return res.status(400).send({ status: false, msg: "At the time of new entry no data should be deleted" });
        }

        // Finally the registration of college is succesfull
        const collegeData = await collegeModel.create(requestBody);
        res.status(201).send({ status: true, message: `College Registered Succesfully`, data: collegeData });
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}




module.exports.createCollege = createCollege 