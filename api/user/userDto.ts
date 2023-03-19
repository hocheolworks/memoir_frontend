export type GithubCodeDto = {
  code: string;
};

export type GithubSignUpDto = {
  githubUserId: string;
  blogName: string;
  email: string;
};

export type GithubGetContributionDto = {
  token: string;
  username: string;
  year: number;
};
