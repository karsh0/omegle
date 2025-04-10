import { useEffect, useRef, useState } from "react"
import { Room } from "./Room"
export function Landing() {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [localAudioTrack, setlocalAudioTrack] = useState<MediaStreamTrack | null>(null)
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null)
    const [joined, setJoined] = useState(false)
    const [name, setName] = useState<string>('')

    async function getCam() {
        console.log('inside cam')
        try {
            const stream = await window.navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            })
            const audioTrack = stream.getAudioTracks()[0]
            const videoTrack = stream.getVideoTracks()[0]

            setlocalAudioTrack(audioTrack)
            setlocalVideoTrack(videoTrack)

            if (videoRef.current) {
                videoRef.current.srcObject = new MediaStream([videoTrack])
                videoRef.current.play()
            }
        } catch (err) {
            console.error("Error accessing media devices:", err)
        }
    }

    if (!joined) {
        return (
            <div>
                <h2>Hi</h2>
                <video autoPlay ref={videoRef}></video>
                <div>
                    <label>Enter name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                    <button onClick={() => {
                        setJoined(true)
                        getCam()
                    }}>Join</button>
                </div>
            </div>
        )
    } else {
        return (
            <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
        )
    }
}
