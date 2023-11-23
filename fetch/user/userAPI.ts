import axios from "axios";
import { ContributionCalendar } from "@utils/types";
import {
  GithubCodeDto,
  GithubGetContributionDto,
  GithubSignUpDto,
  UpdateUserDto,
} from "./requests";
import { setToken } from "@token/index";
import req from "@api/core";
import { plainToInstance } from "class-transformer";
import {
  MeResponseBody,
  SignInResponseBody,
  SignUpResponseBody,
} from "./responses";
import dayjs from "dayjs";

const UserAPI = {
  signIn: async (githubCodeDto: GithubCodeDto) => {
    const { headers, data } = await req.post("/users/signin", githubCodeDto);

    const auth = headers["authorization"];
    if (auth) {
      const token = auth.slice(7);
      setToken(token);
    }

    return plainToInstance(SignInResponseBody, data.data);
  },

  signUp: async (githubSignUpDto: GithubSignUpDto) => {
    const { data } = await req.post("/users/signup", githubSignUpDto);
    return plainToInstance(SignUpResponseBody, data.data);
  },

  me: async () => {
    const { data } = await req.get("/users/me");
    return plainToInstance(MeResponseBody, data.data);
  },

  getUserByUsername: async (githubUserName: string) => {
    const { data } = await req.get(`/users?githubUserName=${githubUserName}`);
    return plainToInstance(MeResponseBody, data.data);
  },

  updateUser: async (updateUserDto: UpdateUserDto) => {
    const { data } = await req.put("/users/me", updateUserDto);
    return plainToInstance(MeResponseBody, data.data);
  },

  bypassGetContributionData: async ({
    username,
    year,
  }: Omit<GithubGetContributionDto, "token">) => {
    const { data } = await axios.get(
      `/api/contributions/${username}?year=${year}`
    );

    const calender: ContributionCalendar = data;

    return calender;
  },

  getContributionData: async ({
    token,
    username,
    year,
  }: GithubGetContributionDto) => {
    const now = dayjs();
    const lastYear = now.subtract(1, "year").add(1, "day");

    const from_to_date = year
      ? `from: "${year}-01-01T00:00:00" , to:"${year}-12-31T23:59:59"`
      : `from: "${lastYear.format("YYYY-MM-DD")}T00:00:00" , to: "${now.format(
          "YYYY-MM-DD"
        )}T23:59:59"`;

    const query = `query {
      user(login: "${username}") {
        contributionsCollection(${from_to_date}) {
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
