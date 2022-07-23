import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { Video } from "../../utils/type";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
interface IVideoCard {
  post: Video;
}
export const VideoCard: NextPage<IVideoCard> = ({ post }) => {
  const [isHover, setisHover] = useState(false);
  const [playing, setplaying] = useState(false);
  const [isVideoMuted, setisVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setplaying(false);
    } else {
      videoRef?.current?.play();
      setplaying(true);
    }
  };
  return (
    <div className="flex flex-col pb-6 border-b-2 border-gray-200">
      <div>
        <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
          <div className="w-10 h-10 md:w-16 md:h-16">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="Image"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div className="">
            <Link href="">
              <div className="flex gap-2 item-center">
                <p className="flex gap-2 font-bold item-center md:text-md text-primary">
                  {post.postedBy.userName}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                {` `}
                <p className="hidden text-xs font-medium text-gray-500 capitalize md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-4 xl:ml-20">
        <div
          className="rounded-3xl"
          onMouseEnter={() => {
            setisHover(true);
          }}
          onMouseLeave={() => {
            setisHover(false);
          }}
        >
          <Link href="/">
            <video
              ref={videoRef}
              loop
              className="xl:w-[600px]  h-[300px] md:h-[400px] xl:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              src={post.video.asset.url}
            ></video>
          </Link>
        </div>
        {isHover && (
          <div className="absolute flex gap-10 cursor-pointer bottom-6 left-8 md:left-14 xl:left-0 xl:justify-between w-[100px] md:[50px] p-3">
            {playing ? (
              <button onClick={onVideoPress}>
                <BsFillPauseFill className="text-2xl text-black xl:text-4xl" />
              </button>
            ) : (
              <button onClick={onVideoPress}>
                <BsFillPlayFill className="text-2xl text-black xl:text-4xl" />
              </button>
            )}
            {isVideoMuted ? (
              <button onClick={() => setisVideoMuted(false)}>
                <HiVolumeOff className="text-2xl text-black xl:text-4xl" />
              </button>
            ) : (
              <button onClick={() => setisVideoMuted(true)}>
                <HiVolumeUp className="text-2xl text-black xl:text-4xl" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
