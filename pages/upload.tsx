import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
const Upload = () => {
  const { userProfile }: { userProfile: any } = useAuthStore();

  const [isLoading, setisLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const [wrongFileType, setsetWrongFileType] = useState(false);

  const router = useRouter();
  const uploadVideo = async (e: any) => {
    const selectedFiles = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    // uploading video to sanity
    if (fileTypes.includes(selectedFiles.type)) {
      setWrongFileType(false);
      setisLoading(true);
      client.assets
        .upload("file", selectedFiles, {
          contentType: selectedFiles.type,
          filename: selectedFiles.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setisLoading(false);
        });
    } else {
      setisLoading(false);
      setWrongFileType(true);
    }
  };
  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?.id,
        },
        topic: category,
      };
      // making api and posting our video
      const post = await axios.post("http://localhost3000/api/post", document);
      // pushin video to hoe page after upload
      const homeVideo = router.push("/");
      console.log("post", post);
      console.log("uploadedVideo", homeVideo);
    }
  };
  return (
    <div className="absolute flex w-full h-full left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center ">
      <div className=" w-[60%] bg-white rounded-lg xl:h[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-base text-gray-400">
              Post video to your account
            </p>
          </div>
          <div className="border-4 border-gray-200 border-dashed rounded-xl flex flex-col justify-center items-center outline-none mt-100 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      className="rounded-xl h-[450px] mt-16 bg-black"
                      src={videoAsset.url}
                      loop
                      controls
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p className="text-xl font-bold">
                          <FaCloudUploadAlt className="text-6xl text-gray-300" />
                        </p>
                        <p className="text-xl font-medium ">Upload Video</p>
                      </div>
                      <div>
                        <p className="mt-10 leading-10 text-center text-gray-400 text-small">
                          MP4 or WebM or OGG <br />
                          720*1280 or Higher
                          <br />
                          Up to 10 Minutes
                          <br />
                          Less than 2GB
                          <br />
                        </p>
                        <p className="bg-[#F51997] text-center mt-10 rounded text-white text-base font-medium p-2 w-52 outline-none">
                          Select Video
                        </p>
                      </div>
                      <input
                        className="w-0 h-0"
                        type="file"
                        name="upload-video"
                        onChange={uploadVideo}
                      />
                    </div>
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Plese upload mention video type
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="font-medium text-md">Caption</label>
          <input
            className="p-2 text-base capitalize border-2 border-gray-200 rounded outline-none"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <label>Choose a category</label>
          <select
            className="p-2 text-base capitalize bg-white border-2 border-gray-200 rounded outline-none cursor-pointer xl:p-4"
            onChange={(e) => setCategory(e.target.value)}
          >
            {topics.map((item) => {
              return (
                <>
                  <option
                    value={item.name}
                    key={item.name}
                    className="p-2 text-gray-700 capitalize bg-white outline-none hover:bg-slate-300"
                  >
                    {item.name}
                  </option>
                </>
              );
            })}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              className="p-2 text-base font-medium border-2 border-gray-300 rounded outline-none w-28 xl:w- 44"
              onClick={() => {}}
              type="button"
            >
              Discard
            </button>
            <button
              className="p-2 text-base font-medium bg-[#f51997] text-white rounded outline-none w-28 xl:w- 44"
              onClick={handlePost}
              type="button"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
function setWrongFileType(arg0: boolean) {
  throw new Error("Function not implemented.");
}
function then(arg0: (data: any) => void) {
  throw new Error("Function not implemented.");
}

function setVideoAsset(data: any) {
  throw new Error("Function not implemented.");
}
