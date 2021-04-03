const db = require('../helpers/db')

exports.createPurchase = async (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO purchase
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

exports.updatePurchase = (data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE purchase
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE createdBy=${data.createdBy} AND idMovie=${data.idMovie} AND idDate=${data.idDate} AND idLocation=${data.idLocation} AND idCinema=${data.idCinema} AND idTime=${data.idTime}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deletePurchaseById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM purchase WHERE idMovie=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getPurchaseById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT p.id, p.createdBy, m.name as movie, d.date as date, L.name as location, c.name as cinema, c.picture as picture, t.time as time,s.name as seat
    FROM movie m
    INNER JOIN purchase p ON m.id=p.idMovie
    INNER JOIN date d ON d.id=p.idDate
    INNER JOIN location L ON L.id=p.idLocation
    INNER JOIN cinema c ON c.id=p.idCinema
    INNER JOIN time t ON t.id=p.idTime
    INNER JOIN seat s ON s.id=p.idSeat
    WHERE p.id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getAllPurchaseByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT p.id, p.createdBy, m.name as movie, d.date as date, L.name as location, c.name as cinema, t.time as time
    FROM purchase p
    INNER JOIN movie m ON m.id=p.idMovie
    INNER JOIN date d ON d.id=p.idDate
    INNER JOIN location L ON L.id=p.idLocation
    INNER JOIN cinema c ON c.id=p.idCinema
    INNER JOIN time t ON t.id=p.idTime
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
