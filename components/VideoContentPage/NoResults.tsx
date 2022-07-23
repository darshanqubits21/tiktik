import React from "react";
interface INoResults {
  text: string;
}
export const NoResults = ({ text }: INoResults) => {
  return <div>{text}</div>;
};
