import axios from "axios";
import jwt_decode from "jwt-decode";
export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: { sub: string; name: string; picture: string } = jwt_decode(
    response.credential
  );
  const { name, sub, picture } = decoded;
  console.log(decoded);
  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };
  // add user
  addUser(user);
  await axios.post(`http://localhost:3000/api/auth`, user);
};
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
