const genreModel = require('../models/genre')
const response = require('../helpers/response')
const qs = require('querystring')
const { APP_URL } = process.env

exports.getGenre = async (req, res) => {
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
      totalData = await genreModel.getCountGenreByCondition(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    } else {
      totalData = await genreModel.getCountGenre(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    }
    console.log(totalData)
    const results = await genreModel.getAllGenreByCondition(cond)
    console.log(results)

    return response(
      res,
      200,
      true,
      'List of all genre',
      results,
      {
        totalData: totalData[0].totalData,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}genre?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}genre?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
exports.getDetailGenre = async (req, res) => {
  try {
    const { id } = req.params
    const results = await genreModel.getGenreByCondition({ id })
    console.log(results)
    if (results.length === 1) {
      return response(res, 200, true, `Detail's ${results[0].name}`, results[0])
    }
    return response(res, 404, false, 'Genre not found')
  } catch (err) {
    return response(res, 400, false, 'Bad Request')
  }
}
exports.createGenre = async (req, res) => {
  try {
    const data = req.body
    const genreData = {
      name: data.name,
      createdBy: req.userData.id
    }
    const createGenre = await genreModel.createGenre(genreData)
    console.log(createGenre)
    if (createGenre.affectedRows > 0) {
      const results = await genreModel.getGenreByCondition({ id: createGenre.insertId })
      if (results.length > 0) {
        return response(res, 200, true, 'Create genre success', results)
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Create genre failed')
  }
}
