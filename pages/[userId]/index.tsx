import React, { useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";
import CircleAvatar from "../../components/CircleAvatar";
import { connect, useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/modules/authSlice";
import Link from "next/link";
import GithubIcon from "../../public/logo/social/github-mark-white.svg";
import ContributionGraph from "../../components/ContributionGraph/ContributionGraph";
import { wrapper } from "../../redux/store/store";
import { RootState } from "../../redux/modules";
import { ContributionCalendar } from "../../utils/types";
import UserAPI from "../../api/user/userAPI";
import { errorHandler } from "../../api/error";

const index: NextPage<{ contributionData: ContributionCalendar }> = ({
  contributionData,
}) => {
  const user = useSelector(selectAuthUser);

  useEffect(() => {
    if (!user) alert("회원정보가 없습니다.");
  }, [user]);

  return (
    <div className="flex h-full w-full items-start justify-center">
      <div className="flex-1 bg-black text-center brightness-75">left</div>
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
              <p className="ml-2 text-2xl">{user.name}</p>
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
            <ContributionGraph
              width={823}
              height={128}
              contributionData={contributionData}
            />
          </div>
        </div>
        <div className="my-4 h-0.5 w-full bg-neutral-500 opacity-50"></div>
        {/* <div className="bg-neutral-500"></div>
        <div className="bg-neutral-500"></div> */}
      </div>
      <div className="flex-1 bg-neutral-300 text-center"></div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const user = store.getState().auth.authUser;

    try {
      const res = await UserAPI.getContributionData(
        user.githubAccessToken ?? "",
        user.githubId ?? "",
        new Date().getFullYear()
      );

      const contributionCalendar: ContributionCalendar =
        res.data.data.user.contributionsCollection.contributionCalendar;

      return { props: { contributionData: contributionCalendar } };
    } catch (e) {
      errorHandler(e);
      return {
        props: { contributionData: { totalContributions: 0, weeks: [] } },
      };
    }
  }
);

export default connect((state: RootState) => state)(index);
