import { Socket } from "socket.io";
import { User } from "./UserManager";

type Room = {
    user1: User,
    user2: User
}

let GLOBAL_ROOMID = 1;

export class RoomManager{
    private rooms: Map<string, Room>
    
    constructor(){
        this.rooms = new Map<string, Room>()
    }

    createRoom(user1: User, user2: User){
        const roomId = this.generate().toLocaleString()
        this.rooms.set(roomId.toString(), {
            user1,
            user2
        })

        user1.socket.emit("send-offer", {
            roomId
        })

        user2.socket.emit("send-offer", {
            roomId
        })
    }   

    onOffer(roomId: string, sdp: string, senderId: string){
        const room = this.rooms.get(roomId)
        if(!room){
            return
        }

        const receiverId = room.user1.socket.id == senderId ? room.user2 : room.user1
        receiverId.socket.emit("offer",{
            sdp,
            roomId
        })
    }

    onAnswer(roomId: string, sdp: string, receiverId: string){
        const room = this.rooms.get(roomId)
        if(!room){
            return
        }

        const senderId = room.user1.socket.id == receiverId ? room.user2 : room.user1
        senderId.socket.emit("offer",{
            sdp,
            roomId
        })
    }

    generate(){
        return GLOBAL_ROOMID++; 
    }

}