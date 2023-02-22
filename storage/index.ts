export const getGithubToken = () => {
  return sessionStorage.getItem("githubAccessToken") ?? "";
};

export const setGithubToken = (token: string) => {
  sessionStorage.setItem("githubAccessToken", token);
};

export const removeGithubToken = () => {
  sessionStorage.removeItem("githubAccessToken");
};
