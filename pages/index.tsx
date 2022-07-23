import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import VideoContentPage from "../components/VideoContentPage/VideoContentPage";
import axios from "axios";
import { Video } from "../utils/type";
interface IVideos {
  videos: Video[];
}

const Home = ({ videos }: IVideos) => {
  return (
    <>
      <div>
        <VideoContentPage videos={videos} />
      </div>
    </>
  );
};
export const getServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:3000/api/post");
  return {
    props: { videos: data },
  };
};
export default Home;
