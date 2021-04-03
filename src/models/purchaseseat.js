const db = require('../helpers/db')

exports.createBulkPurchaseSeat = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO purchaseseat
    (idPurchase, idSeat)
    VALUES
    ${data.map(idSeat => `(${id}, ${idSeat})`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

// above two genre
exports.checkManySeat = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM seat
    WHERE id IN (${data.map(item => item).join()})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

// one genre
exports.checkOneSeat = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM seat
    WHERE id=${data}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getPurchaseSeatById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT p.id, p.movie, p.date, p.location, p.cinema, p.time, p.price, s.name as seat
    FROM purchase p
    INNER JOIN purchaseseat ps ON p.id=ps.idPurchase
    INNER JOIN seat s ON s.id=ps.idSeat
    WHERE p.id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
