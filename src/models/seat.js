const db = require('../helpers/db')

exports.createSeat = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO seat
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

exports.updateSeat = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE seat
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteSeat = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM seat WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getSeatByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM seat WHERE ${Object.keys(cond).map(item => `${item}="${cond[item]}"`).join(' AND ')}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getAllSeatByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * 
    FROM seat
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

exports.getCountSeatByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT COUNT(id) as totalData 
    FROM seat 
    WHERE name LIKE "%${cond.search}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCountSeat = () => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT COUNT(id) as totalData 
    FROM seat
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getSoldSeat = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT seat
    FROM purchase
    WHERE movie LIKE "%${data.movie}%" AND date LIKE "%${data.date}%" AND location LIKE "%${data.location}%" AND cinema LIKE "%${data.cinema}%" AND time LIKE "%${data.time}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.soldSeat = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT p.id, p.movie, p.date, p.location, p.cinema, p.time, p.price, s.id as seat
    FROM purchase p
    INNER JOIN purchaseseat ps ON p.id=ps.idPurchase
    INNER JOIN seat s ON s.id=ps.idSeat
    WHERE p.movie LIKE "%${data.movie}%" AND p.date LIKE "%${data.date}%" AND p.location LIKE "%${data.location}%" AND p.cinema LIKE "%${data.cinema}%" AND p.time LIKE "%${data.time}%"
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
