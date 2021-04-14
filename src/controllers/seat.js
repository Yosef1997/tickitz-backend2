const seatModel = require('../models/seat')
const response = require('../helpers/response')
const qs = require('querystring')
const { APP_URL } = process.env

exports.getSeat = async (req, res) => {
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
      totalData = await seatModel.getCountSeatByCondition(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    } else {
      totalData = await seatModel.getCountSeat(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    }
    console.log(totalData)
    const results = await seatModel.getAllSeatByCondition(cond)
    console.log(results)

    return response(
      res,
      200,
      true,
      'List of all seat',
      results,
      {
        totalData: totalData[0].totalData,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}seat?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}seat?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
exports.getDetailSeat = async (req, res) => {
  try {
    const { id } = req.params
    const results = await seatModel.getSeatByCondition({ id })
    console.log(results)
    if (results.length === 1) {
      return response(res, 200, true, `Detail's ${results[0].name}`, results[0])
    }
    return response(res, 404, false, 'Seat not found')
  } catch (err) {
    return response(res, 400, false, 'Bad Request')
  }
}
exports.createSeat = async (req, res) => {
  try {
    const data = req.body
    const seatData = {
      name: data.name,
      createdBy: req.userData.id
    }
    const createSeat = await seatModel.createSeat(seatData)
    console.log(createSeat)
    if (createSeat.affectedRows > 0) {
      const results = await seatModel.getSeatByCondition({ id: createSeat.insertId })
      if (results.length > 0) {
        return response(res, 200, true, 'Create seat success', results)
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Create seat failed')
  }
}
exports.getSeatSold = async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    const results = await seatModel.soldSeat(data)
    const output = []
    results.forEach((item) => {
      const existing = output.filter((value, index) => {
        return value.movie === item.movie
      })
      if (existing.length) {
        const existingIndex = output.indexOf(existing[0])
        output[existingIndex].seat = output[existingIndex].seat.concat(item.seat)
      } else {
        if (typeof item.seat === 'string') { item.seat = [item.seat] }
        output.push(item)
      }
    })
    const [seat] = output
    if (results.length > 0) {
      return response(res, 200, true, 'List of sold seat', seat)
    }
    return response(res, 400, false, 'Sold seat not found')
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
