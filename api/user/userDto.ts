export type GithubCodeDto = {
  code: string;
};

export type GithubSignUpDto = {
  githubId: string;
  blogName: string;
  email: string;
  githubAccessToken: string;
};

export type GithubGetContributionDto = {
  token: string;
  username: string;
  year: number;
};
