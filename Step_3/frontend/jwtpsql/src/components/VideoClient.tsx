'use client';

import { useEffect, useRef } from "react";

const VideoClient = ({idx}:{idx: number}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if(videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <video
        ref={videoRef}
        src={`videos/pos-${idx+1}.mp4`}
        // controls
        autoPlay
        loop
        muted
        playsInline
        // onLoadedMetadata={(e) => (e.currentTarget.playbackRate=0.5)} //this doesn't seem to work
        className="rounded-xl absolute inset-0 w-full h-full object-cover opacity-80 brightness-75 pointer-events-none"
    />
  )
}
export default VideoClient