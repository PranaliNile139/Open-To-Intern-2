const validator = require("email-validator");

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false 
    return true;
}


const isValidBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}


const isValidMobile = function (value) {
    if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value.trim()))) {
        return false
    }
    return true
}


const isValidEmail = function (value) {
    if (!(validator.validate(value))) {
        return false
    }
    return true
}


module.exports.isValid = isValid
module.exports.isValidBody = isValidBody
module.exports.isValidMobile = isValidMobile
module.exports.isValidEmail = isValidEmail