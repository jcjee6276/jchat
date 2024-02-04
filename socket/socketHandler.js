const socketHandler = (io) => {
    const messageQueue = [];
    io.on("connection", (socket) => {

        //room 입장 
        socket.on('join_room', async({roomName, nickname}) => {
            try {
                socket.join(roomName);
                console.log('[joinRoom] roomName = ', roomName);
                console.log('[joinRoom] userId = ', nickname);
            } catch (error) {
                console.log('[socketHandler join_room] error = ', error);
            }
        })

        // socket.on('leave_room', (roomName, nickname) => {
        //     
        //     socket.leave(roomName);
        
        // });

        
        //유저 입장 시 해당하는 room에 입장한 유저 닉네임 전송
        socket.on("userEnter", (message)=> {
            try{
                socket.to(message.roomName).emit('userEnterNickname', message.nickname);
            } catch (error) {
                console.log('[socketHandler userEnter] error = ', error);
            }
            
        })
        
        //메세지 전송
        socket.on('sendMessage', (message) => {
            try{
                console.log('New message:', message);
                messageQueue.push(message);
                socket.to(message.room).emit('receiveMessage', message);
            } catch (error) {
                console.log('[socketHandler send_message] error = ', error);
            }
        });

        //messageQueue 정리 함수 
        setInterval(() => {
            if (messageQueue.length > 0) {
                const message = messageQueue.shift();
                io.emit('reveiveMessage', message);
            }
        }, 100);
    
        socket.on('disconnect', () => {
  
        });
    })

    
}

export default socketHandler;