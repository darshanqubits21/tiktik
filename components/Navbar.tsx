import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Logo from "/utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  return (
    <div className="flex justify-between w-full px-4 py-2 border-b-2 border-gray-200 item-center">
      <Link href="/">
        <div className="w-[100px] md:[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktik logo"
            layout="responsive"
          />
        </div>
      </Link>
      <div>SEARCH</div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="flex items-center gap-2 px-2 text-base font-semibold border-2 md:px-4">
                <IoMdAdd className="text-xl" /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <Image
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  src={userProfile.image}
                  alt="Image"
                />
              </Link>
            )}
            <button
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className="px-2"
              type="button"
            >
              <AiOutlineLogout color="red" fontSize={25} />
            </button>
          </div>
        ) : (
          <div>
            <GoogleLogin
              onSuccess={(response) => {
                createOrGetUser(response, addUser);
              }}
              onError={() => console.log("Error")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
