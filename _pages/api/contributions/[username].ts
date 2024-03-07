import UserAPI from "@api/user/userAPI";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.query.username as string;
  const year = req.query.year as string | undefined;
  const token = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN_FOR_PUBLIC_ACCESS;
  try {
    const contributionCalendar = await UserAPI.getContributionData({
      token: token ?? "",
      username: username as string,
      year: year ? parseInt(year) : new Date().getFullYear(),
    });

    res.json(contributionCalendar);
  } catch (e: any) {
    res.status(500).send(e);
  }
}
