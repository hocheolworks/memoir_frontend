export type GithubCodeDto = {
  code: string;
};

export type GithubSignUpDto = {
  githubUserName: string;
  blogName: string;
  email: string;
};

export type GithubGetContributionDto = {
  token: string;
  username: string;
  year?: number;
};

export type UpdateUserDto = {
  blogIntroduction: string;
};
