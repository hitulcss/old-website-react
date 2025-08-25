import React from "react";
import "./YoutubePlayer.css";
import { useEffect, useRef } from "react";

const YoutubePlayer = ({ videoId }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);

    script.onload = () => {
      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("youtube-player", {
          height: "360",
          width: "640",
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            showinfo: 0,
            loop: 1,
            fs: 1,
            rel: 0,
            enablejsapi: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      };
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [videoId]);

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
    }
  };

  return (
    <>
      <div id="youtube-player"></div>
    </>
  );
};

export default YoutubePlayer;
