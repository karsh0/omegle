import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export function Room({name, localAudioTrack, localVideoTrack}:{
    name:string,
    localAudioTrack: MediaStreamTrack | null,
    localVideoTrack: MediaStreamTrack | null
}){
    const URL = "http://localhost:3000";

    const [socket, setSocket] = useState<Socket | null>(null)
    const [lobby, setLobby] = useState(true)
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(()=>{
        if(!socket) return

        socket.on('send-offer', async ({roomId}:{roomId: string}) =>{
            alert('offer send')
            setLobby(false)


            const pc = new RTCPeerConnection()

            const sdp = pc.createOffer()
            socket.emit('offer', {
                sdp,
                roomId
            })
        })
      

    },[socket])


    useEffect(()=>{
        const socket = io(URL)
        setSocket(socket)
    },[name])


    return  <div>
    Hi {name}
    <video autoPlay width={400} height={400} ref={localVideoRef} />
    {lobby ? "Waiting to connect you to someone" : null}
    <video autoPlay width={400} height={400} ref={remoteVideoRef} />
</div>
}