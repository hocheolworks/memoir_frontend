export type ResponseAPI = {
  status: number;
  data: any;
};

export type GithubCodeDto = {
  code: string;
};

export type GithubSignUpDto = {
  githubId: string;
  blogName: string;
  email: string;
  githubAccessToken: string;
};
