import { NextRouter } from "next/router";

export type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  githubUserName: string;
  blogName: string;
  email: string;
  profileImage: string;
  description: string;
};

export type Children = JSX.Element | JSX.Element[] | string | string[];

export type TreeNodeChild = {
  id: number;
  name: string;
  parentName?: string;
};

export type TreeNodeParent = TreeNodeChild & {
  children?: TreeNodeChild[];
};

export type DefaultProps = {
  className?: string;
  children?: Children;
};

export type Category = {
  id: number;
  isParent: boolean;
  depth1: string;
  depth2: string;
};

export type IsAllExpandedWrapper = {
  value: boolean;
};

export type ContributionTile = {
  count: number;
  level: number;
  date: Date;
};

export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type ContributionCalendarDay = {
  contributionCount: number;
  contributionLevel: ContributionLevel;
  date: string;
  weekday: number;
};

export type ContributionCalendarWeek = {
  contributionDays: ContributionCalendarDay[];
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionCalendarWeek[];
};

export type ContributionTooltipData = {
  date: string;
  count: number;
  clientLeft: number;
  clientTop: number;
  weekIdx: number;
  weekday: number;
};

export type WithRouterProps = {
  router: NextRouter;
};

export type Preview = {
  directUrl: string;
  githubId?: string; // 특정 id로 조회시 생략
  avatar?: string; // 특정 id로 조회시 생략
  thumbnailUrl?: string;
  title: string;
  abstract: string;
  createDate: Date;
  commentCount: number;
  likeCount: number;
  tagList?: Array<string>; // 특정 id로 조회시 필수
};

export type Series = {
  thumbnailUrl?: string;
  title: string;
  postCount: number;
  lastUpdateDate: Date;
};

export type TagData = {
  name: string;
  count: number;
};

export type Post = {
  title: string;
  githubId: string;
  profileImage: string;
  createDate: string;
  tagList?: Array<string>;
  seriesName?: string;
  seriesIndex?: number;
  seriesList?: Array<SeriesPreview>;
  content: string;
  commentList?: Array<Comment>;
};

export type Comment = {
  githubId: string;
  comment: string;
  createdAt: string;
};

export type SeriesPreview = {
  directUrl: string;
  title: string;
};
