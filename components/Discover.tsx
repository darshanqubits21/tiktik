import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

export const Discover = () => {
  const activeTopicStyles =
    "xl:border-2 hover:bg-primary xl:#[f51997]  px-3 py-2 rounded xl:rounded-full flex item-center gap-2   justify-center cursor-pointer text-[#ff1997]";

  const topicStyles =
    "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex item-center gap-2 justify-center cursor-pointer text-black";
  const router = useRouter();
  const { topic } = router.query;
  return (
    <div className="xl:border-b-2  xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold mt-4 m-3 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((item) => {
          return (
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <div
                className={
                  topic === item.name ? activeTopicStyles : topicStyles
                }
              >
                <span className="font-bold text-2xl xl:text-md ">
                  {item.icon}
                </span>
                <span className="font-medium  text-md hidden xl:block capitalize ">
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
