import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import CircleAvatar from "../../components/CircleAvatar";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/modules/authSlice";
import Link from "next/link";
import GithubIcon from "../../public/logo/social/github-mark-white.svg";
import ContributionGraph from "../../components/ContributionGraph/ContributionGraph";
import { ContributionCalendar, WithRouterProps } from "../../utils/types";
import UserAPI from "../../api/user/userAPI";
import { errorHandler } from "../../api/error";
import { withRouter } from "next/router";
import { decodeByAES256 } from "../../utils/functions";
import { NextPageContext } from "next/types";
import NavigationBar from "../../components/NavigationBar";

export async function getServerSideProps({ query }: NextPageContext) {
  const { data, userId } = query;
  const decodedData = decodeByAES256(
    "githubAccessToken".padEnd(32, " "),
    data as string
  );

  try {
    const res = await UserAPI.getContributionData({
      token: decodedData,
      username: userId as string,
      year: new Date().getFullYear(),
    });

    const contributionCalendar: ContributionCalendar =
      res.data.data.user.contributionsCollection.contributionCalendar;

    return { props: { contributionData: contributionCalendar } };
  } catch (e) {
    errorHandler(e);
    return {
      props: { contributionData: { totalContributions: -1, weeks: [] } },
    };
  }
}

const Index: NextPage<
  { contributionData: ContributionCalendar } & WithRouterProps
> = ({ contributionData }) => {
  const user = useSelector(selectAuthUser);
  const [selectedNavIndex, setSelectedNavIndex] = useState<number>(0);
  const [contribution, setContribution] =
    useState<ContributionCalendar>(contributionData);

  useEffect(() => {
    if (!user) alert("회원정보가 없습니다.");
  }, [user]);

  const retryBtnClick = async () => {
    if (!user) {
      return;
    }

    try {
      const res = await UserAPI.getContributionData({
        token: user.githubAccessToken ?? "",
        username: user.githubId ?? "",
        year: new Date().getFullYear(),
      });

      const contributionCalendar: ContributionCalendar =
        res.data.data.user.contributionsCollection.contributionCalendar;

      setContribution(contributionCalendar);
    } catch (e) {
      errorHandler(e);
      setContribution({ totalContributions: -1, weeks: [] });
    }
  };

  return (
    <div className="flex h-full w-full items-start justify-center">
      <div className="flex-1 bg-black text-center brightness-75">Left</div>
      <div className="flex w-[832px] flex-col items-center text-center">
        <div className="w-full px-1 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CircleAvatar
                className="h-[50px]"
                src={user.avatar ?? ""}
                alt="circleAvartar"
                width={50}
                height={50}
              ></CircleAvatar>
              <p className="ml-2 text-2xl">{user.githubId}</p>
            </div>
            <div className="flex h-8 items-center">
              {/* <p className="mr-2 text-xs text-neutral-500">{user.githubId}</p> */}
              <Link
                href={`https://github.com/${encodeURIComponent(
                  user.githubId ?? ""
                )}`}
              >
                <a className="h-8 w-8 brightness-50 invert hover:brightness-75 dark:invert-0">
                  <GithubIcon />
                </a>
              </Link>
            </div>
          </div>
          <div id="contribution" className="mt-4 h-[200px] text-black">
            {contribution.totalContributions !== -1 ? (
              <ContributionGraph
                width={823}
                height={128}
                contributionData={contribution}
              />
            ) : (
              <div className="flex h-[184px] w-full flex-col items-center justify-center rounded-md bg-neutral-300 dark:bg-neutral-700">
                <p className="text-md mb-3 dark:text-neutral-400">
                  contribution 정보를 불러올 수 없습니다.
                </p>
                <button
                  className="w-20 rounded-[0.25rem] bg-neutral-200 py-1 text-sm text-neutral-900 hover:brightness-90 dark:bg-neutral-800 dark:text-neutral-300"
                  onClick={retryBtnClick}
                >
                  다시 시도
                </button>
              </div>
            )}
          </div>
        </div>
        <NavigationBar
          selectedIndex={selectedNavIndex}
          setSelectedIndex={setSelectedNavIndex}
          labels={["글", "시리즈", "소개"]}
          className="mt-8"
        />
      </div>
      <div className="flex-1 bg-neutral-300 text-center">Right</div>
    </div>
  );
};

export default withRouter(Index);
