import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopFive } from "../services/shoutoutApiService";
import TopFive from "../model/TopFive";

const TopFiveV = () => {
  const [topFive, setTopFive] = useState<TopFive[]>([]);
  useEffect(() => {
    getTopFive().then((res) => {
      console.log(res);
      setTopFive(res);
    });
  }, []);
  return (
    <main className="TopFiveV">
      <h2>Top 5 Recipients</h2>
      <ol>
        {topFive.map((item, index) => (
          <li key={index}>
            <h3>
              {item._id} ({item.count})
            </h3>
            <Link to={`/user/${encodeURIComponent(item._id)}`}>
              See {item._id}'s shoutouts
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
};

export default TopFiveV;
