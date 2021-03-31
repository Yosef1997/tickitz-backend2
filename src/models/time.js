const db = require('../helpers/db')

exports.createTime = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO time
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

exports.updateTime = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE time
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteTime = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM time WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getTimeByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM time WHERE ${Object.keys(cond).map(item => `${item}="${cond[item]}"`).join(' AND ')}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getAllTimeByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * 
    FROM time
    WHERE time LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCountTimeByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT COUNT(id) as totalData 
    FROM time 
    WHERE time LIKE "%${cond.search}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCountTime = () => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT COUNT(id) as totalData 
    FROM time
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
