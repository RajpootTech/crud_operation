const{body} =require("express-validator")


const validationRegistration=[
body('name')
.notEmpty().withMessage('This field is required')
.isLength({min:5, max:10}).withMessage('Name maximum length is 10')
.trim(),
// .isAlpha().withMessage('Name must be alphanumeric letter'),
body('email')
.isEmail().withMessage('Please provide an valid email')
.normalizeEmail(),
body('phone')
.isLength({max:11}).withMessage('please enter a valid number of 11 digit'),
]

module.exports = {validationRegistration};