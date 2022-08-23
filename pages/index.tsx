import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main>
      <ul>
        {new Array(10).fill(1).map((val, i) => (
          <div key={i}>Hello Memoir</div>
        ))}
      </ul>
    </main>
  );
};

export default Home;
