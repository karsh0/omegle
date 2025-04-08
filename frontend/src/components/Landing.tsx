import { useEffect, useRef, useState } from "react"

export function Landing(){
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [localAudioTrack, setlocalAudioTrack] = useState<MediaStreamTrack | null>(null)
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null)

    async function getCam(){
        const stream = await window.navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]

        if(!videoRef.current){
            return
        }

        setlocalAudioTrack(audioTrack)
        setlocalVideoTrack(videoTrack)
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play()
    }


    useEffect(()=>{
        if(videoRef && videoRef.current){
            getCam()
        }
    },[videoRef])
    return <div>
        hii
        <video autoPlay ref={videoRef}></video>
        <div>
        <label>Enter room Id</label>
        <input type="text" />
        </div>
    </div>
}