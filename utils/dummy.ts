import { getRandomArbitrary } from "./functions";
import { ContributionTile } from "./types";

Array(365)
  .fill(0)
  .forEach((value, index) => {
    const date = new Date(2022, 0, 1);
    date.setDate(date.getDate() + index);
    const count = getRandomArbitrary(0, 11);
    const tile: ContributionTile = {
      count: count,
      date: date,
      level: getRandomArbitrary(0, 5),
    };
  });

export const dummyContributionData: ContributionTile[][] = [];
