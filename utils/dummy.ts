import { getRandomArbitrary, getWeekNumber } from "./functions";
import { ContributionTile } from "./types";

export const getDummyContributionData = (year: number) => {
  const dummyContributionData: (ContributionTile | null)[][] = Array.from(
    Array(53),
    () => Array(7).fill(null)
  );

  for (let i = 0; i < 365; i++) {
    const date = new Date(year, 0, 1 + i);

    const dayIdx = date.getDay();
    const weekIdx = getWeekNumber(date);
    const count = getRandomArbitrary(0, 11);
    const tile: ContributionTile = {
      count: count,
      date: date,
      level: getRandomArbitrary(0, 5),
    };

    dummyContributionData[weekIdx][dayIdx] = tile;
  }

  //   dummyContributionData.forEach((val1, idx1) =>
  //     val1.forEach((val2, idx2) => {
  //       console.log(`${idx1}, ${idx2} : ${val2?.date.toDateString()}`);
  //     })
  //   );

  return dummyContributionData;
};
