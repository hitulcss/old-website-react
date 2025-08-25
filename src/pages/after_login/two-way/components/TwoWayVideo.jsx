//imports
import MyVideo from "./MyVideo/MyVideo";
import "./TwoWayVideo.css";

const TwoWayVideo = ({ isProduceStart, onDoubleClickHandler, handleCameraOff, handleCameraOn, setIsCameraOn, isCameraOn, isMicOn, setIsMicOn, handleMicOff, handleMicOn }) => {
  console.log('Inside two way video', isCameraOn)

  // const onDoubleClickHandler = () => {
  //     console.log('Coming')
  // }

  // console.log('IsVideo', isProduceStart)
  return (
    <>
      <div className='video-container' id='videoContainer'>
        {/* <div id="localVideoContainer" style={{}} > */}
        {/* <span className='host-tag'>Host</span> */}


        {/* <video id="localVideo" autoPlay controls className="video" muted style={{ minWidth: "90%", maxWidth: "100%", height: '400px', right: '50px', bottom: '25%' }}></video> */}
        {/* </div> */}
      </div>

      <div style={{ width: !isProduceStart ? '0px' : '100%', height: !isProduceStart ? '0px' : '100%', overflow: 'hidden', position: 'absolute' }}>
        <MyVideo isMicOn={isMicOn} setIsMicOn={setIsMicOn} isProduceStart={isProduceStart} handleCameraOff={handleCameraOff} handleCameraOn={handleCameraOn} isCameraOn={isCameraOn} setIsCameraOn={setIsCameraOn} handleMicOff={handleMicOff} handleMicOn={handleMicOn} />
      </div>
    </>
  )
}

export default TwoWayVideo;
