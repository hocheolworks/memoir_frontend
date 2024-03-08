import { errorHandler } from "@api/error";
import PostAPI from "@api/post/postAPI";
import UserAPI from "@api/user/userAPI";
import { ContributionCalendar, PreviewToBe } from "@utils/types";
import UserMemoirClientPage from "app/[userId]/client-page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { userId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const userId = params.userId;

  if (userId) {
    return {
      title: `${userId} - MEMOIR.`,
    };
  } else {
    notFound();
  }
}

async function getContributions(userId: string) {
  let posts: PreviewToBe[] = [];
  let contributionCalendar: ContributionCalendar = {
    totalContributions: -1,
    weeks: [],
  };

  let introduce = null;

  try {
    const token =
      process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN_FOR_PUBLIC_ACCESS ?? "";
    contributionCalendar = await UserAPI.getContributionData({
      token: token,
      username: userId as string,
    });

    const { data } = await PostAPI.getPosts(userId);
    posts = data.list;

    const { blogIntroduction } = await UserAPI.getUserByUsername(userId);
    introduce = blogIntroduction;
  } catch (e: any) {
    console.log("/[userId] Error");
    console.log(e);
    errorHandler(e);
  }

  return {
    userId: userId,
    posts: posts,
    introduce: introduce ?? "",
    contributionData: contributionCalendar,
  };
}

interface PageProps {
  params: {
    userId: string;
  };
}

export default async function UserPage({ params }: PageProps) {
  const props = await getContributions(params.userId);

  return <UserMemoirClientPage {...props} />;
}
