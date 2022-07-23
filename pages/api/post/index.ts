// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // making api call
  if (req.method === "GET") {
    const query = allPostsQuery();
    // fetching data from sanity
    const data = await client.fetch(query);
    res.status(200).json(data);
  }
}
