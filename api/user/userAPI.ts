import axios from "axios";
import { GithubCodeDto, GithubSignUpDto } from "../dto";

const UserAPI = {
  login: (githubCodeDto: GithubCodeDto) => {
    return axios.post(
      "/api/users/login",
      JSON.stringify({
        code: githubCodeDto.code,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  signUp: (githubSignUpDto: GithubSignUpDto) => {
    return axios.post(
      "/api/users",
      JSON.stringify({
        githubId: githubSignUpDto.githubId,
        blogName: githubSignUpDto.blogName,
        email: githubSignUpDto.email,
        githubAccessToken: githubSignUpDto.githubAccessToken,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};

export default UserAPI;
