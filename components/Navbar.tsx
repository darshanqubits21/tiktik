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
const Navbar = () => {
  const user = false;
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
        {user ? (
          <div>Logged In</div>
        ) : (
          <div>
            <GoogleLogin
              onSuccess={(response) => {
                console.log(response);
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
