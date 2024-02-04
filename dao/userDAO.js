// userSelect.js
const userDAO = {
  userSelect: (userId) => {
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    return query;
  },
  
  userSignup: (id, passwd, nickname) => {
    const query = `INSERT INTO users SET id='${id}', passwd='${passwd}', nickname='${nickname}'`;
    return query;
  },

  userNickname: (userNickname) => {
    const query = `SELECT * FROM users WHERE nickname = '${userNickname}'`
    return query;
  }

};

export default userDAO;
