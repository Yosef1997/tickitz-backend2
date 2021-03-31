const { checkSchema } = require('express-validator')
const { validationResult } = require('express-validator')
const response = require('../helpers/response')
const fs = require('fs')

exports.valdationResult = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
    return response(res, 400, false, errors.array()[0].msg)
  }
  return next()
}

exports.updateUser = checkSchema({
  firstname: {
    optional: { options: { nullable: true } },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'First name should be at least min 2 & max 50 character'
    }
  },
  lastname: {
    optional: { options: { nullable: true } },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'Last name should be at least min 2 & max 50 character'
    }
  },
  phoneNumber: {
    optional: { options: { nullable: true } },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'Phone number should be at least min 2 & max 50 character'
    }
  },
  password: {
    // optional: { options: { nullable: true } },
    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: 'Password at least have 8 character'
    }
  }
})
