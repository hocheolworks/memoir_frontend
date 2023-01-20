import React, { ReactElement, useEffect, useState } from "react";
import CircleAvatar from "../../components/CircleAvatar";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/modules/authSlice";
import Link from "next/link";
import GithubIcon from "../../public/logo/social/github-mark-white.svg";
import ContributionGraph from "../../components/ContributionGraph/ContributionGraph";
import { ContributionCalendar, WithRouterProps } from "../../utils/types";
import UserAPI from "../../api/user/userAPI";
import { errorHandler } from "../../api/error";
import { useRouter, withRouter } from "next/router";
import { decodeByAES256 } from "../../utils/functions";
import { NextPageContext } from "next/types";
import NavigationBar from "../../components/NavigationBar";
import {
  dummyPreview,
  dummySeriesList,
  dummyTagList,
  dummyTree,
} from "../../utils/dummy";
import Series from "../../components/Series";
import NoContents from "../../components/NoContents";
import Introduction from "../../components/Introduction";
import TagList from "../../components/TagList";
import PostList from "../../components/PostList";
import CategoryTreeNav from "../../components/CategoryTreeNav";
import { NextPageWithLayout } from "../_app";
import Layout from "../../components/MainLayout";

export async function getServerSideProps({ query }: NextPageContext) {
  const { data, userId } = query;

  try {
    const decodedData = decodeByAES256(
      "githubAccessToken".padEnd(32, " "),
      data as string
    );
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

const UserMemoir: NextPageWithLayout<
  { contributionData: ContributionCalendar } & WithRouterProps
> = ({ contributionData }) => {
  const user = useSelector(selectAuthUser);
  const router = useRouter();
  const { userId, tag } = router.query;
  const [selectedNavIndex, setSelectedNavIndex] = useState<number>(0);
  const [contribution, setContribution] =
    useState<ContributionCalendar>(contributionData);

  useEffect(() => {
    // 회원정보가 없어도 방문가능하지 않니?
    if (!user) alert("회원정보가 없습니다.");
  }, [user]);

  const retryBtnClick = async () => {
    if (!user) {
      return;
    }

    try {
      const res = await UserAPI.getContributionData({
        token: user.githubAccessToken ?? "",
        username: (userId as string) ?? "",
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
    <div className="mb-14 flex h-full w-full items-start justify-center">
      <div className="flex flex-1 flex-col items-end bg-red-100">
        {selectedNavIndex === 0 && (
          <div className="absolute mt-[465px] mr-4 hidden flex-col pb-24 left-area-visible:flex">
            <CategoryTreeNav tree={dummyTree}></CategoryTreeNav>
            <TagList className="mt-32" tagList={dummyTagList} />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center text-center contribution-width:w-[823px]">
        <div className="w-full pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CircleAvatar
                className="h-[50px]"
                src={user.avatar ?? ""}
                alt="circleAvartar"
                width={50}
                height={50}
              ></CircleAvatar>
              <p className="ml-2 text-2xl">{userId}</p>
            </div>
            <div className="flex h-8 items-center">
              <Link
                href={`https://github.com/${encodeURIComponent(
                  (userId as string) ?? ""
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
          className="my-8 w-full contribution-width:w-96"
        />
        {selectedNavIndex === 0 && (
          // (dummyPreview.length !== 0 ? ( // 글
          //   <>
          //     <div className="mb-4 hidden w-full justify-end first:flex">
          //       <div className="flex items-center rounded-sm border-[1px] border-neutral-500 bg-neutral-200 p-2 dark:bg-neutral-800">
          //         <AiOutlineSearch />
          //         <input className="ml-1 bg-inherit text-sm outline-none"></input>
          //       </div>
          //     </div>
          //     {dummyPreview.map((value, index) => (
          //       <PreviewHorizontal
          //         key={`myPreview#${index}`}
          //         preview={value}
          //         index={index}
          //       />
          //     ))}
          //   </>
          // ) : (
          //   <NoContents type="post" />
          // ))
          <PostList
            className="w-full"
            postList={dummyPreview}
            filterTag={tag as string}
          ></PostList>
        )}
        {selectedNavIndex === 1 && // 시리즈
          (dummySeriesList.length !== 0 ? (
            <div className="flex flex-wrap">
              {dummySeriesList.map((value, index) => (
                <Series
                  key={`myPreview#${index}`}
                  series={value}
                  index={index}
                  className="w-full px-4 py-6 contribution-width:w-1/2"
                />
              ))}
            </div>
          ) : (
            <NoContents type="series" />
          ))}
        {selectedNavIndex === 2 && (
          <Introduction userId={userId as string}></Introduction>
        )}
      </div>
      <div className="flex-1 text-center">
        {/*Right*/}
        {/* <div className="">
          <TagList
            className="mt-[465px] ml-4 text-left"
            userId={userId as string}
            tagList={dummyTagList}
          />
        </div> */}
      </div>
    </div>
  );
};

UserMemoir.getLayout = function getLayout(page: ReactElement) {
  return <Layout withFooter={false}>{page}</Layout>;
};

export default UserMemoir;
