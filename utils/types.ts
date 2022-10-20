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
