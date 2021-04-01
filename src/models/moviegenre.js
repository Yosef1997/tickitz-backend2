const db = require('../helpers/db')

exports.createBulkMovieGenre = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO moviegenre
    (idMovie, idGenre)
    VALUES
    ${data.map(idGenre => `(${id}, ${idGenre})`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateMovieGenre = (id, data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`  
      UPDATE moviegenre
      SET idGenre=${data}
      WHERE idMovie=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteMovieGenreById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM moviegenre WHERE idMovie=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

// above two genre
exports.checkManyGenre = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM genre
    WHERE id IN (${data.map(item => item).join()})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

// one genre
exports.checkOneGenre = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM genre
    WHERE id=${data}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getMovieGenreById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT m.id, m.name, m.releaseDate, g.name as genre, m.duration, m.description, m.director, m.star, m.picture
    FROM movie m
    INNER JOIN moviegenre mg ON m.id=mg.idMovie
    INNER JOIN genre g ON g.id=mg.idGenre
    WHERE m.id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getAllMovieGenreByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT m.id, m.name, m.releaseDate, g.name as genre, m.duration, m.description, m.director, m.star, m.picture
    FROM movie m
    INNER JOIN moviegenre mg ON m.id=mg.idMovie
    INNER JOIN genre g ON g.id=mg.idGenre
    WHERE m.name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
