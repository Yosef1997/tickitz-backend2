const movieModel = require('../models/movie')
const movieGenreModel = require('../models/moviegenre')
const response = require('../helpers/response')
const qs = require('querystring')
const { APP_URL } = process.env

exports.getMovie = async (req, res) => {
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
      totalData = await movieModel.getCountMovieByCondition(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    } else {
      totalData = await movieModel.getCountMovie(cond)
      totalPage = Math.ceil(Number(totalData[0].totalData) / cond.limit)
    }
    console.log(totalData)
    const results = await movieGenreModel.getAllMovieGenreByCondition(cond)
    console.log(results)

    return response(
      res,
      200,
      true,
      'List of all movie',
      results,
      {
        totalData: totalData[0].totalData,
        currentPage: cond.page,
        totalPage,
        nextLink: cond.page < totalPage ? `${APP_URL}movie?${qs.stringify({ ...req.query, ...{ page: cond.page + 1 } })}` : null,
        prevLink: cond.page > 1 ? `${APP_URL}movie?${qs.stringify({ ...req.query, ...{ page: cond.page - 1 } })}` : null
      }
    )
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Bad Request')
  }
}
exports.getDetailMovie = async (req, res) => {
  try {
    const { id } = req.params
    const results = await movieGenreModel.getMovieGenreById(id)
    const output = []
    results.forEach((item) => {
      const existing = output.filter((value, index) => {
        return value.name === item.name
      })
      if (existing.length) {
        const existingIndex = output.indexOf(existing[0])
        output[existingIndex].genre = output[existingIndex].genre.concat(item.genre)
      } else {
        if (typeof item.genre === 'string') { item.genre = [item.genre] }
        output.push(item)
      }
    })
    if (results.length > 0) {
      return response(res, 200, true, `Detail's ${results[0].name}`, output)
    }
    return response(res, 404, false, 'Movie not found')
  } catch (err) {
    return response(res, 400, false, 'Bad Request')
  }
}
exports.createMovie = async (req, res) => {
  try {
    const data = req.body
    const selectedGenre = []
    if (typeof data.idGenre === 'object') {
      const results = await movieGenreModel.checkManyGenre(data.idGenre)
      if (results.length !== data.idGenre.length) {
        return res.status(400).json({
          success: false,
          massage: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    } else if (typeof data.idGenre === 'string') {
      const results = await movieGenreModel.checkOneGenre(data.idGenre)
      if (results.length !== data.idGenre.length) {
        return res.status(400).json({
          success: false,
          massage: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    }

    const movieData = {
      name: data.name,
      releaseDate: data.releaseDate,
      duration: data.duration,
      description: data.description,
      director: data.director,
      star: data.star,
      picture: (req.file && req.file.path) || null,
      createdBy: req.userData.id
    }
    const createMovie = await movieModel.createMovie(movieData)
    if (createMovie.affectedRows > 0) {
      if (selectedGenre.length > 0) {
        await movieGenreModel.createBulkMovieGenre(createMovie.insertId, selectedGenre)
      }
      const results = await movieGenreModel.getMovieGenreById(createMovie.insertId)
      if (results.length > 0) {
        return response(res, 200, true, 'Create movie success', results)
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'Create movie failed')
  }
}
