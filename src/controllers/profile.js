const authModel = require('../models/auth')
const response = require('../helpers/response')
const bcrypt = require('bcrypt')
const fs = require('fs')

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.userData
    const {
      firstName,
      lastName,
      fullName,
      email,
      password,
      phoneNumber
    } = req.body
    const salt = await bcrypt.genSalt()
    const initialResults = await authModel.getUsersByCondition({ id })
    if (initialResults.length < 1) {
      return response(res, 404, false, 'User Not Found')
    }
    // fullName
    if (fullName !== '' && fullName !== undefined) {
      const mapUsername = fullName.split(' ')
      let firstName = null
      let lastName = null
      if (mapUsername.length > 0) {
        firstName = mapUsername[0]
        lastName = mapUsername.splice(1, mapUsername.length).join(' ')
        await authModel.updateUser(id, { firstName: firstName, lastName: lastName })
      } else {
        firstName = mapUsername[0]
        await authModel.updateUser(id, { firstName: firstName })
      }
    }

    // firstName
    if (firstName !== '' && firstName !== undefined) {
      await authModel.updateUser(id, { firstName: firstName })
    }
    // lastName
    if (lastName !== '' && lastName !== undefined) {
      await authModel.updateUser(id, { lastName: lastName })
    }

    // email
    if (email !== '' && email !== undefined) {
      await authModel.updateUser(id, { email: email })
    }

    // Password
    if (password !== '' && password !== undefined) {
      const compare = bcrypt.compareSync(password, initialResults[0].password)
      console.log(compare)
      if (!compare) {
        const encryptedNewPassword = await bcrypt.hash(password, salt)
        console.log(encryptedNewPassword)
        await authModel.updateUser(id, { password: encryptedNewPassword })
      }
    }

    // phone
    if (phoneNumber !== '' && phoneNumber !== undefined) {
      await authModel.updateUser(id, { phoneNumber: phoneNumber })
    }

    // picture
    if (req.file) {
      const picture = req.file.filename
      // if (picture !== '') {
      const updatePicture = await authModel.updateUser(id, { picture })
      if (updatePicture.affectedRows > 0) {
        if (initialResults[0].picture !== null) {
          fs.unlinkSync(`upload/profile/${initialResults[0].picture}`)
        }
      }
      // }
    }

    // info
    const finalResult = await authModel.getUsersByCondition({ id })
    if (finalResult.length > 0) {
      return response(res, 200, true, 'Personal Information has been updated', finalResult[0])
    }
    return response(res, 400, false, 'Cant Update personal Information')
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}

exports.updatePicture = async (req, res) => {
  try {
    const { id } = req.userData
    const initialResults = await authModel.getUsersByCondition({ id })
    if (initialResults.length < 1) {
      return response(res, 404, false, 'User Not Found')
    }
    const picture = req.file.filename
    const updatePicture = await authModel.updateUser(id, { picture })
    if (updatePicture.affectedRows > 0) {
      if (initialResults[0].picture !== null) {
        fs.unlinkSync(`upload/profile/${initialResults[0].picture}`)
      }
      return response(res, 200, true, 'Image has been Updated', { id, picture })
    }
    return response(res, 400, false, 'Cant update image')
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}

exports.deletePicture = async (req, res) => {
  try {
    const { id } = req.userData
    console.log(id)
    const initialResults = await authModel.getUsersByCondition({ id })
    if (initialResults.length < 1) {
      return response(res, 404, false, 'User Not Found')
    }
    if (initialResults[0].picture === null) {
      return response(res, 400, false, 'Your are not using profile picture')
    }
    const uploadImage = await authModel.deletePicture(id)
    if (uploadImage.affectedRows > 0) {
      if (initialResults[0].picture !== null) {
        fs.unlinkSync(`upload/profile/${initialResults[0].picture}`)
      }
      return response(res, 200, true, 'Delete picture profile successfully', { id, picture: null })
    }
    return response(res, 400, false, 'Cant Delete Profile')
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
