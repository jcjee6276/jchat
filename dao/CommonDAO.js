// query.js
import connection from '../MySQLConnection.js';

const CommonDAO = {};

//1개의 query만 보낼 때
CommonDAO.select = async (sql) => {
  const result = await new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });

  return result;
};

//2개 이상의 query문을 보낼 때
CommonDAO.selectMultiple = async (sqlArray) => {
  const resultsArray = await Promise.all(
    sqlArray.map((sql) => {
      return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });
      });
    })
  );

  return resultsArray;
};


CommonDAO.insert = async (sql) => {
  await new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

CommonDAO.update = async (sql) => {
  await new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

CommonDAO.delete = async (sql) => {
  await new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

// 내보내기
export default CommonDAO;
