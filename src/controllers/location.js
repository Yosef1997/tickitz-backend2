const locationModel = require('../models/location')
const response = require('../helpers/response')
const qs = require('querystring')
const { APP_URL } = process.env

exports.getLocation = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 4
    cond.offset = (cond.page - 1) * cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    let totalPage
    let totalData

    if (cond.search) {
      totalData = await locationModel.getCountLocationByCondition(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    } else {
      totalData = await locationModel.getCountLocation(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    }
    console.log(totalData)
    const results = await locationModel.getAllLocationByCondition(cond)
    console.log(results)

    return response(
      res,
      200,
      true,
      'List of all location',
      results,
      {
        totalData: totalData[0].totalData,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}location?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}location?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
exports.getDetailLocation = async (req, res) => {
  try {
    const { id } = req.params
    const results = await locationModel.getLocationByCondition({ id })
    console.log(results)
    if (results.length === 1) {
      return response(res, 200, true, `Detail's ${results[0].name}`, results[0])
    }
    return response(res, 404, false, 'Location not found')
  } catch (err) {
    return response(res, 400, false, 'Bad Request')
  }
}
exports.createLocation = async (req, res) => {
  try {
    const data = req.body
    const locationData = {
      name: data.name,
      createdBy: req.userData.id
    }
    const createLocation = await locationModel.createLocation(locationData)
    console.log(createLocation)
    if (createLocation.affectedRows > 0) {
      const results = await locationModel.getLocationByCondition({ id: createLocation.insertId })
      if (results.length > 0) {
        return response(res, 200, true, 'Create location success', results)
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Create location failed')
  }
}
