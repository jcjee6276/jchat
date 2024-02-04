// friendDAO.js
const friendDAO = {
  //친구 목록 query id가 포함된 반대 column req_user column과 res_user column 즉 친구만 출력한다.
    friendActiveList: (id) => {
      const query = `SELECT
                        CASE
                            WHEN req_user = '${id}' THEN res_user
                            WHEN res_user = '${id}' THEN req_user
                        END AS user,
                        u.nickname AS nickname
                        FROM friend f
                        JOIN users u ON 
                        (f.req_user = '${id}' AND f.res_user = u.id) OR
                        (f.res_user = '${id}' AND f.req_user = u.id)
                        WHERE (f.req_user = '${id}' OR f.res_user = '${id}') AND f.status = 'ACTIVE';
                        `
      return query;
    },
    //친구 추가 목록 Query friendActiveList Query와 반대로 친구와 나를 제외하고 출력한다.
    friendAddList: (id) => {
      let query = []

      let friendAddList = `SELECT id, nickname
                        FROM users
                        WHERE id NOT IN (
                            SELECT
                              CASE
                                WHEN req_user = '${id}' THEN res_user
                                WHEN res_user = '${id}' THEN req_user
                              END AS user_id
                            FROM friend f
                            WHERE (f.req_user = '${id}' OR f.res_user = '${id}') 
                        ) AND id <> '${id}'`;

      const userCount = `SELECT COUNT(*) AS count FROM users`;
      query.push(friendAddList);
      query.push(userCount);
      return query;
    },
    //친구 요청 query 요청 id (reqUser) , 수신 id (resUser)를 insert한다.
    friendRequest: (reqUser, resUser) => {
      const query = `INSERT INTO friend 
                        SET req_user='${reqUser}', res_user='${resUser}'`;
      return query;
    },

    //친구 수신 query PENDING 상태의 res_user가 포함된 data를 출력한다.
    friendResponse: (resUser) => {
      const query = `
      SELECT f.req_user, users.nickname FROM friend f 
      LEFT JOIN users ON f.req_user = users.id 
      WHERE res_user='${resUser}' AND STATUS='PENDING'
      `

      return query;
    },
    //친구 수락 API. PENDING 상태에서 ACTIVE 상태로 업데이트 한다.
    friendAccept: (reqUser, resUser) => {
      const query = `
                UPDATE friend SET status='ACTIVE' 
                WHERE req_user='${reqUser}' AND res_user='${resUser}'
      `

      return query;
    },
    //친구 요청 거절 API. 해당 Column을 삭제한다.
    friendRefuse: (reqUser, resUser) => {
      const query = `
                  DELETE FROM friend
                  WHERE req_user='${reqUser}' AND res_user='${resUser}'
      `;

      return query;
    },

    //친구 삭제 API.
    friendDelete: (reqUser, resUser) => {
      const query = `
              DELETE FROM friend 
              WHERE (req_user='${reqUser}' AND res_user='${resUser}') 
              OR (req_user='${resUser}' AND res_user='${reqUser}')
      `;

      return query;
    }

  
  };
  
  export default friendDAO;
  