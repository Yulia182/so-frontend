import { Link, useParams } from "react-router-dom";
import Shoutout from "../model/Shoutout";
import "./css/ShoutoutView.css";
import { getShoutoutById } from "../services/shoutoutApiService";
import { useEffect, useState } from "react";

interface Props {
  shoutout?: Shoutout;
  deleteShoutout?: (id: string) => void;
}

const ShoutoutView = ({ shoutout, deleteShoutout }: Props) => {
  const id: string | undefined = useParams().id;
  const [details, setDetails] = useState<Shoutout | undefined>(shoutout);
  useEffect(() => {
    if (id) {
      getShoutoutById(id).then((res) => setDetails(res));
    }
  }, [id]);
  // console.log(shoutout);
  return (
    <>
      {details ? (
        <div className="ShoutoutView">
          <Link to={`/user/${encodeURIComponent(details.to)}`}>
            <p id="shoutout-to">Shout out to {details.to}</p>
          </Link>

          <p id="shoutout-from">
            {shoutout?.userPhoto && (
              <img src={shoutout?.userPhoto} alt="shoutout" />
            )}
            - from {details.from}
          </p>
          {shoutout?.shoutoutImg && (
            <img src={shoutout.shoutoutImg} alt=""></img>
          )}
          <p id="shoutout-text">{details.text}</p>
          {deleteShoutout && (
            <button
              onClick={() => {
                deleteShoutout(details._id!);
              }}
            >
              Delete
            </button>
          )}

          <Link to={`/shoutouts/${details._id}`}>See Details</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ShoutoutView;
