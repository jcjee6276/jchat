// loginRoute.js
import {Router} from 'express';
import userDAO from '../dao/userDAO.js';
import CommonDAO from '../dao/CommonDAO.js';

const router = Router();

//로그인 API
router.post('/login', async (req, res, next)=>{
    const user = await CommonDAO.select(userDAO.userSelect(req.body.id));
    console.log(user, req.body);
    if(!user[0]) {
        return 'fail';
    }
    //request로 받은 passwd와 DB passwd 비교하여 일치하면 session 발행
    if(req.body.passwd === user[0].passwd) {
        req.session.username = user[0].id;
        return res.send(req.session.username)
    } else {
        return 'fail';
    }
    
})

//client에서 세션정보 관리하기 위하여 로그인 한 유저정보 response
router.get('/get-session', async(req, res)=> {
    const user = await CommonDAO.select(userDAO.userSelect(req.session.username));
    console.log(req.session);
    return res.send(user);
})

//회원가입 API
router.post('/signup', async (req, res) => {
    const user = await CommonDAO.select(userDAO.userSelect(req.body.id));
    try{
        if(req.body.id === user[0].id) {
            return fail;
        }
    } catch (e) {
        console.log('signup Error : ', e);
    }

    await CommonDAO.insert(userDAO.userSignup(req.body.id, req.body.passwd, req.body.nickname));
    
    return "success"
})

//아이디, 닉네임 중복체크 API
router.get('/signup/checkduplicate', async (req, res) => {
    const paramId = req.query.id;
    const paramNickname = req.query.nickname;
    console.log(paramId, paramNickname)
    if(paramId) {
        const id = await CommonDAO.select(userDAO.userSelect(paramId));

        if(id[0]) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    } 
    if(paramNickname) {
        const nickname = await CommonDAO.select(userDAO.userNickname(paramNickname));
        if(nickname[0]) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    }
    
})

//로그아웃 API
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.error('세션을 지우는 중 에러 발생:', err);
          res.status(500).send('세션 지우는 중 서버 에러 발생');
        } else {
          res.status(200).send('success');
        }
      });
}) 

export default router;