import { useContext, useEffect, useState } from "react";
import Shoutout from "../model/Shoutout";
import { getMyShoutouts } from "../services/shoutoutApiService";
import ShoutoutView from "./ShoutoutView";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const My = () => {
  const [my, setMy] = useState<Shoutout[]>([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.displayName) {
      //api call
      getMyShoutouts(user?.displayName).then((res) => setMy(res));
    }
  }, [user]);

  setTimeout(() => {
    // user is set async in context...
    // therefore, User will always be null for a moment on refresh
    // setTimeout is allowing for that to possibly be set before navigating
    if (!user) {
      // we'll only navigate after 2 seconds if user is STILL null
      navigate("/");
    }
  }, 2000); // 2 second

  return (
    <div className="My">
      <h2>My shoutouts</h2>
      <ul>
        {my.map((item) => {
          return <ShoutoutView key={item._id} shoutout={item} />;
        })}
      </ul>
    </div>
  );
};

export default My;
