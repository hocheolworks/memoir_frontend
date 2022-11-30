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
