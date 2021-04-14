const timeModel = require('../models/time')
const response = require('../helpers/response')
const qs = require('querystring')
const { APP_URL } = process.env

exports.getTime = async (req, res) => {
  try {
    const cond = req.query
    cond.search = cond.search || ''
    cond.page = Number(cond.page) || 1
    cond.limit = Number(cond.limit) || 8
    cond.offset = (cond.page - 1) * cond.limit
    cond.sort = cond.sort || 'id'
    cond.order = cond.order || 'ASC'

    let totalPage
    let totalData

    if (cond.search) {
      totalData = await timeModel.getCountTimeByCondition(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    } else {
      totalData = await timeModel.getCountTime(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    }
    console.log(totalData)
    const results = await timeModel.getAllTimeByCondition(cond)
    console.log(results)

    return response(
      res,
      200,
      true,
      'List of all time',
      results,
      {
        totalData: totalData[0].totalData,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}time?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}time?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
exports.getDetailTime = async (req, res) => {
  try {
    const { id } = req.params
    const results = await timeModel.getTimeByCondition({ id })
    console.log(results)
    if (results.length === 1) {
      return response(res, 200, true, `Detail's ${results[0].time}`, results[0])
    }
    return response(res, 404, false, 'time not found')
  } catch (err) {
    return response(res, 400, false, 'Bad Request')
  }
}
exports.createTime = async (req, res) => {
  try {
    const data = req.body
    const timeData = {
      time: data.time,
      createdBy: req.userData.id
    }
    const createTime = await timeModel.createTime(timeData)
    console.log(createTime)
    if (createTime.affectedRows > 0) {
      const results = await timeModel.getTimeByCondition({ id: createTime.insertId })
      if (results.length > 0) {
        return response(res, 200, true, 'Create time success', results)
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Create time failed')
  }
}
