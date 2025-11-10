'use client';

const VideoClient = ({idx}:{idx: number}) => {
  return (
    <video
        src={`videos/pos-${idx+1}.mp4`}
        // controls
        autoPlay
        loop
        muted
        playsInline
        // onLoadedMetadata={(e) => (e.currentTarget.playbackRate=0.5)}
        className="rounded-xl absolute inset-0 w-full h-full object-cover z-[-1] opacity-80 brightness-75"
    />
  )
}
export default VideoClient