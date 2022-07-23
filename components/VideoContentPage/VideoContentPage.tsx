import React from "react";
import { Video } from "../../utils/type";
import { NoResults } from "./NoResults";
import { VideoCard } from "./VideoCard";
interface IVideos {
  videos: Video[];
}

const VideoContentPage = ({ videos }: IVideos) => {
  console.log(videos);
  return (
    <div className="flex flex-col h-full gap-10 videos">
      {videos.length ? (
        videos?.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={`No Videos`} />
      )}
    </div>
  );
};

export default VideoContentPage;
