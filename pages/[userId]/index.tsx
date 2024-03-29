import React, { ReactElement, useEffect, useState } from "react";
import ContributionGraph from "@components/ContributionGraph/ContributionGraph";
import {
  ContributionCalendar,
  PreviewToBe,
  TreeNodeParent,
  WithRouterProps,
} from "@utils/types";
import UserAPI from "@api/user/userAPI";
import { errorHandler } from "@api/error";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import NavigationBar from "@components/NavigationBar";
import Series from "@components/Series";
import NoContents from "@components/NoContents";
import Introduction from "@components/Introduction";
import TagList from "@components/TagList";
import PostList from "@components/PostList";
import CategoryTreeNav from "@components/CategoryTreeNav";
import ProfileCard from "@components/ProfileCard";
import { NextPageWithLayout } from "@pages/_app";
import GlobalLayout from "@components/GlobalLayout";
import useUser from "@hooks/useUser";
import PostAPI from "@api/post/postAPI";
import { getPostCategories } from "@api/post-category";
import { cls, makeTreeFromCategories } from "@utils/functions";
import Head from "next/head";

export async function getServerSideProps({ query }: NextPageContext) {
  const userId = query.userId as string;

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
    props: {
      userId: userId,
      posts: posts,
      introduce: introduce,
      contributionData: contributionCalendar,
    },
  };
}

const UserMemoir: NextPageWithLayout<
  {
    userId: string;
    posts: PreviewToBe[];
    contributionData: ContributionCalendar;
    introduce: string;
  } & WithRouterProps
> = ({ userId, posts, contributionData, introduce }) => {
  const router = useRouter();
  const { tag } = router.query;
  const [selectedNavIndex, setSelectedNavIndex] = useState<number>(0);
  const [categories, setCategories] = useState<TreeNodeParent[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);
  const [contribution, setContribution] =
    useState<ContributionCalendar>(contributionData);

  const [filteredPosts, setFilteredPosts] = useState<PreviewToBe[]>(posts);

  const retryBtnClick = async () => {
    try {
      const contributionCalendar = await UserAPI.bypassGetContributionData({
        username: userId,
      });

      setContribution(contributionCalendar);
    } catch (e: any) {
      errorHandler(e);
      setContribution({ totalContributions: -1, weeks: [] });
    }
  };

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        const { data } = await getPostCategories(userId);

        setCategories(makeTreeFromCategories(data));
      } catch (e: any) {
        errorHandler(e);
      }
    };

    asyncWrapper();
  }, [userId]);

  useEffect(() => {
    PostAPI.getPosts(
      userId,
      selectedCategoryId === -1 ? undefined : selectedCategoryId
    )
      .then((res) => {
        setFilteredPosts(res.data.list);
      })
      .catch((e) => {
        if (e.statusCode === 404) {
          setFilteredPosts([]);
        }
      });
  }, [selectedCategoryId, userId]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  return (
    <>
      <Head>
        <title>{userId} - MEMOIR.</title>
      </Head>
      <div className="mb-14 flex h-full w-full items-start justify-center">
        <div className="flex flex-1 flex-col items-end bg-red-100">
          {selectedNavIndex === 0 && (
            <div className="absolute mt-[465px] mr-4 hidden w-[184px] flex-col pb-24 left-area-visible:flex">
              <CategoryTreeNav
                tree={categories}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
              ></CategoryTreeNav>
              {/* <TagList className="mt-32" tagList={dummyTagList} /> */}
            </div>
          )}
        </div>
        <div className="flex w-full flex-col items-center text-center contribution-width:w-[823px]">
          <div className="w-full pt-8">
            <ProfileCard userName={userId} />
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
            labels={[
              "글",
              // "시리즈",
              "소개",
            ]}
            className="my-8 w-full contribution-width:w-96"
          />
          {selectedNavIndex === 0 && (
            <PostList
              className="w-full"
              postList={filteredPosts}
              filterTag={tag as string}
            ></PostList>
          )}
          {/* {selectedNavIndex === 1 && // 시리즈
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
            ))} */}
          <Introduction
            className={cls(selectedNavIndex !== 1 && "hidden")}
            introduce={introduce}
            userId={userId as string}
          ></Introduction>
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
    </>
  );
};

UserMemoir.getLayout = (page: ReactElement) => (
  <GlobalLayout withoutFooter>{page}</GlobalLayout>
);

export default UserMemoir;
