import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export function Room({name, localAudioTrack, localVideoTrack}:{
    name:string,
    localAudioTrack: MediaStreamTrack | null,
    localVideoTrack: MediaStreamTrack | null
}){
    const [socket, setSocket] = useState<Socket | null>(null)
    const localVideoRef = useRef<HTMLVideoElement>();

    const URL = "http://localhost:3000";


    useEffect(()=>{
        const socket = io(URL)
        setSocket(socket)
    },[socket])


    return <div>
        Hi {name}
        <video autoPlay width={400} height={400} ref={localVideoRef} />
    </div>
}