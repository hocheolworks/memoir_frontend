export type User = {
  githubId: string;
  avatar: string;
  name: string | null;
  description: string | null;
  location: string | null;
  githubAccessToken: string;
  isMember: boolean;
  member?: Member;
};

export type Member = {
  blogName: string;
  email: string;
};
