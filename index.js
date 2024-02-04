// index.js
import express from "express"
import serverConfig from "./serverConfig.js";
import loginRouter from './routes/loginRoute.js';
import friendRouter from "./routes/friendRoute.js";
import session from 'express-session';
import cors from 'cors';
import {Server} from 'socket.io';
import socketHandler from './socket/socketHandler.js';
import http from 'http';

const app = express();
const port = serverConfig.port;
var server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST"],
  },
});
socketHandler(io); // socket.io 라우트

//HTTP 통신을 위해 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//client cors 문제 해결
app.use(cors({
  origin: ['http://localhost:3000'], 
  credentials: true // withCredentials 활성화
}));

//express session 사용하기 위해 설정
app.use(
    session({
      secret: 'jcjeon', // 세션 데이터 암호화에 사용되는 키
      resave: false,
      saveUninitialized: true
    })
  );




//라우터 추가
app.use('/', loginRouter);
app.use('/friend', friendRouter);



server.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})