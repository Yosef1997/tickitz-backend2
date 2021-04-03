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

exports.getCountPurchaseByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT COUNT(id) as totalData 
    FROM purchase 
    WHERE movie LIKE "%${cond.search}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCountPurchase = () => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT COUNT(id) as totalData 
    FROM purchase
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
    SELECT *
    FROM purchase 
    WHERE movie LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
