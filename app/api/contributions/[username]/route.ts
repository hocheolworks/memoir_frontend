import UserAPI from "@api/user/userAPI";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get("year");
  const username = params.username;
  const token = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN_FOR_PUBLIC_ACCESS;

  try {
    const contributionCalendar = await UserAPI.getContributionData({
      token: token ?? "",
      username: username as string,
      year: year ? parseInt(year) : new Date().getFullYear(),
    });

    return Response.json(contributionCalendar);
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    });
  }
}
