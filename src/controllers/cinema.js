const cinemaModel = require('../models/cinema')
const response = require('../helpers/response')
const qs = require('querystring')
const { APP_URL } = process.env

exports.getCinema = async (req, res) => {
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
      totalData = await cinemaModel.getCountCinemaByCondition(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    } else {
      totalData = await cinemaModel.getCountCinema(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    }

    const results = await cinemaModel.getAllCinemaByCondition(cond)

    return response(
      res,
      200,
      true,
      'List of all Cinema',
      results,
      {
        totalData: totalData[0].totalData,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}cinema?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}cinema?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
exports.getDetailCinema = async (req, res) => {
  try {
    const { id } = req.params
    const results = await cinemaModel.getCinemaByCondition({ id })
    console.log(results)
    if (results.length === 1) {
      return response(res, 200, true, `Detail's ${results[0].name}`, results[0])
    }
    return response(res, 404, false, 'Cant Found Cinema')
  } catch (err) {
    return response(res, 400, false, 'Bad Request')
  }
}
exports.createCinema = async (req, res) => {
  try {
    const data = req.body
    const cinemaData = {
      name: data.name,
      address: data.address,
      price: data.price,
      picture: (req.file && req.file.path) || null,
      createdBy: req.userData.id
    }
    const createCinema = await cinemaModel.createCinema(cinemaData)
    console.log(createCinema)
    if (createCinema.affectedRows > 0) {
      const results = await cinemaModel.getCinemaByCondition({ id: createCinema.insertId })
      if (results.length > 0) {
        return response(res, 200, true, 'Create cinema success', results)
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Create cinema failed')
  }
}
