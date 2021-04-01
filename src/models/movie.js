const db = require('../helpers/db')

exports.createMovie = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO movie
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateMovie = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE movie
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteMovie = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM movie WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getMovieByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM movie WHERE ${Object.keys(cond).map(item => `${item}="${cond[item]}"`).join(' AND ')}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getAllMovieByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * 
    FROM movie
    WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCountMovieByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT COUNT(id) as totalData 
    FROM movie 
    WHERE name LIKE "%${cond.search}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCountMovie = () => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT COUNT(id) as totalData 
    FROM movie
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
