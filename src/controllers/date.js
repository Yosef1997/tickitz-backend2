const dateModel = require('../models/date')
const response = require('../helpers/response')
const qs = require('querystring')
const { APP_URL } = process.env

exports.getDate = async (req, res) => {
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
      totalData = await dateModel.getCountDateByCondition(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    } else {
      totalData = await dateModel.getCountDate(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    }
    console.log(totalData)
    const results = await dateModel.getAllDateByCondition(cond)
    console.log(results)

    return response(
      res,
      200,
      true,
      'List of all date',
      results,
      {
        totalData: totalData[0].totalData,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}date?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}date?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
exports.getDetailDate = async (req, res) => {
  try {
    const { id } = req.params
    const results = await dateModel.getDateByCondition({ id })
    console.log(results)
    if (results.length === 1) {
      return response(res, 200, true, `Detail's ${results[0].name}`, results[0])
    }
    return response(res, 404, false, 'Date not found')
  } catch (err) {
    return response(res, 400, false, 'Bad Request')
  }
}
exports.createDate = async (req, res) => {
  try {
    const data = req.body
    const dateData = {
      date: data.date,
      createdBy: req.userData.id
    }
    const createDate = await dateModel.createDate(dateData)
    console.log(createDate)
    if (createDate.affectedRows > 0) {
      const results = await dateModel.getDateByCondition({ id: createDate.insertId })
      if (results.length > 0) {
        return response(res, 200, true, 'Create date success', results)
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Create date failed')
  }
}
