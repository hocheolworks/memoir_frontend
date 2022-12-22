export type User = {
  githubId: string;
  avatar: string | null;
  name: string | null;
  description: string | null;
  location: string | null;
  isMember: boolean;
  memoirAccessToken: string;
  githubAccessToken: string;
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
