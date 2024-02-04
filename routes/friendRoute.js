import {Router} from 'express';
import CommonDAO from '../dao/CommonDAO.js';
import friendDAO from '../dao/friendDAO.js';

const router = Router();

//친구 목록 API 친구 요청 - 수락이 완료된 관계(friend.status = ACTIVE)
router.get('/active/list', async(req, res) => {
    try{
        const friendActiveList = await CommonDAO.select(friendDAO.friendActiveList(req.query.id));
        return res.send(friendActiveList);
    } catch (error) {
        console.log('friendActiveList Error : ', error);
    }
    
})

//친구 추가 목록 API. 친구 상태, 친구 요청, 수신 상태를 제외한 목록 호출
router.get('/add/list', async(req, res) => {
    try {
        const friendAddList = await CommonDAO.selectMultiple(friendDAO.friendAddList(req.query.id));
        return res.send(friendAddList);
    } catch (error) {
        console.log('friendAddList Error : ', error);
    }
})

//친구 요청 API 최초 상태는 PENDING 수락 시 ACTIVE
router.post('/request', async(req, res) => {
    try {
        await CommonDAO.insert(friendDAO.friendRequest(req.body.req_user, req.body.res_user));
        return res.send('success');
    } catch (error) {
        console.log('frendRequest Error : ', error);
    }
})

//친구 요청 수신 API, PENDING 상태만 출력
router.post('/response', async(req, res) => {
    try {
        
        const responseData = await CommonDAO.select(friendDAO.friendResponse(req.body.res_user));
        return res.send(responseData);
    } catch {
        console.log('friendRequest Error : ', error);
    }
})

//친구 요청 수락 API, PENDING 상태에서 ACTIVE 상태로 UPDATE
router.post('/accept', async(req, res) => {
    try {
        console.log('도착?', req.body.req_user, req.body.res_user);
        await CommonDAO.update(friendDAO.friendAccept(req.body.req_user, req.body.res_user));
        return res.send('success');
    } catch (error) {
        console.log('friendAccept Error : ', error);
    }
})

// 친구 요청 거절 API, friend table column에서 삭제되며, 친구 추가 목록에서 다시 출력된다.
router.post('/refuse', async(req, res) => {
    try {  
        await CommonDAO.delete(friendDAO.friendRefuse(req.body.req_user, req.body.res_user));
        return res.send("success");
    } catch (error) {
        console.log('friendRefuse Error : ', error);
    }
})

// 친구 삭제 API
router.post('/delete', async(req,res) => {
    try {
        console.log(req.body.req_user, req.body.res_user);
        await CommonDAO.delete(friendDAO.friendDelete(req.body.req_user, req.body.res_user));
        return res.send("success");
    } catch ( error ) {
        console.log('friend delete error : ', error);
    }
})

export default router;