const purchaseModel = require('../models/purchase')
const purchaseSeatModel = require('../models/purchaseseat')
const response = require('../helpers/response')
const qs = require('querystring')
const { APP_URL } = process.env

exports.getPurchase = async (req, res) => {
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
      totalData = await purchaseModel.getCountPurchaseByCondition(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    } else {
      totalData = await purchaseModel.getCountPurchase(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    }
    const results = await purchaseModel.getAllPurchaseByCondition(cond)

    return response(
      res,
      200,
      true,
      'List of all purchase',
      results,
      {
        totalData: totalData[0].totalData,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}purchase?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}purchase?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
exports.getDetailPurchase = async (req, res) => {
  try {
    const { id } = req.params
    const results = await purchaseModel.getPurchaseById(id)
    const output = []
    results.forEach((item) => {
      const existing = output.filter((value, index) => {
        return value.name === item.name
      })
      if (existing.length) {
        const existingIndex = output.indexOf(existing[0])
        output[existingIndex].seat = output[existingIndex].seat.concat(item.seat)
      } else {
        if (typeof item.seat === 'string') { item.genre = [item.seat] }
        output.push(item)
      }
    })
    if (results.length > 0) {
      return response(res, 200, true, `Detail's ${results[0].name}`, output)
    }
    return response(res, 404, false, 'purchase not found')
  } catch (err) {
    return response(res, 400, false, 'Bad Request')
  }
}
exports.createPurchase = async (req, res) => {
  try {
    const data = req.body
    const selectedSeat = []
    if (typeof data.idSeat === 'object') {
      const results = await purchaseSeatModel.checkManySeat(data.idSeat)
      if (results.length !== data.idSeat.length) {
        return res.status(400).json({
          success: false,
          massage: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedSeat.push(item.id)
        })
      }
    } else if (typeof data.idSeat === 'string') {
      const results = await purchaseSeatModel.checkOneGenre(data.idSeat)
      if (results.length !== data.idSeat.length) {
        return res.status(400).json({
          success: false,
          massage: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedSeat.push(item.id)
        })
      }
    }
    let priceSeat = null
    selectedSeat.forEach(item => {
      if (item !== 80) {
        priceSeat = selectedSeat.length * 10
      } else if (item === 80) {
        priceSeat = ((selectedSeat.length * 10) + 10)
      }
    })
    console.log(priceSeat)
    const purchaseData = {
      movie: data.movie,
      date: data.date,
      location: data.location,
      cinema: data.cinema,
      time: data.time,
      price: priceSeat,
      createdBy: req.userData.id
    }
    const createPurchase = await purchaseModel.createPurchase(purchaseData)
    if (createPurchase.affectedRows > 0) {
      if (selectedSeat.length > 0) {
        await purchaseSeatModel.createBulkPurchaseSeat(createPurchase.insertId, selectedSeat)
      }
      const results = await purchaseSeatModel.getPurchaseSeatById(createPurchase.insertId)
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
      if (results.length > 0) {
        return response(res, 200, true, 'Create purchase success', output)
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Create purchase failed')
  }
}
