import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./YT_Player.css";

const YT_Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (e) => {
    setProgress(e.played);
  };

  const handleSeekChange = (e) => {
    setProgress(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    setIsPlaying(true);
  };

  return (
    <>
      <div>
        <div className="custom-player">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=HWopg6xaSs4"
            playing={isPlaying}
            controls={false}
            width="100%"
            height="70vh"
            onProgress={handleProgress}
          />
          {/* <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button> */}
          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={progress}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
        </div>
      </div>
    </>
  );
};

export default YT_Player;
