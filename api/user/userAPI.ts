import axios from "axios";
import { jsonHeader } from "../common";
import {
  GithubCodeDto,
  GithubGetContributionDto,
  GithubSignUpDto,
} from "./userDto";

const UserAPI = {
  login: (githubCodeDto: GithubCodeDto) => {
    return axios.post(
      "/api/users/login",
      JSON.stringify({
        code: githubCodeDto.code,
      }),
      jsonHeader
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
      jsonHeader
    );
  },

  getContributionData: ({
    token,
    username,
    year,
  }: GithubGetContributionDto) => {
    const query = `query {
      user(login: "${username}") {
        contributionsCollection(from: "${year}-01-01T00:00:00" , to:"${year}-12-31T23:59:59") {
            contributionCalendar {
                totalContributions
                weeks {
                    contributionDays {
                        contributionCount
                        contributionLevel
                        date
                        weekday
                    }
                }
            }
        }
      }
    }`;

    return axios.post(
      "https://api.github.com/graphql",
      JSON.stringify({
        query,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default UserAPI;
