const db = require('../helpers/db')

exports.createCinema = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO cinema
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

exports.updateCinema = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE cinema
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteCinema = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM cinema WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCinemaByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM cinema WHERE ${Object.keys(cond).map(item => `${item}="${cond[item]}"`).join(' AND ')}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getAllCinematByCondition = (id, cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * 
    FROM cinema
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

exports.getCountCinematByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT COUNT(id) as totalData 
    FROM cinema 
    WHERE name LIKE "%${cond.search}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCountCinema = () => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT COUNT(id) as totalData 
    FROM cinema
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
