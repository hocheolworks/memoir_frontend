import axios from "axios";
import { ContributionCalendar } from "@utils/types";
import {
  GithubCodeDto,
  GithubGetContributionDto,
  GithubSignUpDto,
} from "./userDto";
import { setToken } from "@token/index";
import req from "@api/core";
import { plainToInstance } from "class-transformer";
import {
  MeResponseBody,
  SignInResponseBody,
  SignUpResponseBody,
} from "./responses";

const UserAPI = {
  signIn: async (githubCodeDto: GithubCodeDto) => {
    const { headers, data } = await req.post(
      "/api/users/signin",
      githubCodeDto
    );

    const auth = headers["Authorization"];
    console.log(headers);
    if (auth) {
      const token = auth.slice(7);
      setToken(token);
    }

    return plainToInstance(SignInResponseBody, data);
  },

  signUp: async (githubSignUpDto: GithubSignUpDto) => {
    const { data } = await req.post("/api/users/signup", githubSignUpDto);
    return plainToInstance(SignUpResponseBody, data);
  },

  me: async () => {
    const { data } = await req.get("/api/users/me");
    return plainToInstance(MeResponseBody, data);
  },

  getContributionData: async ({
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

    const res = await axios.post(
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

    const { data } = res;

    const calender: ContributionCalendar =
      data.data.user.contributionsCollection.contributionCalendar;

    return calender;
  },
};

export default UserAPI;
