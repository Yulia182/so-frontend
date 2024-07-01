import { useEffect, useState } from "react";
import AddForm from "./AddForm";
import ListOfShoutouts from "./ListOfShoutouts";
import {
  addNewShoutout,
  deleteShoutoutById,
  getAllShoutouts,
} from "../services/shoutoutApiService";
import Shoutout from "../model/Shoutout";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const HomeView = () => {
  const name: string | undefined = useParams().name;
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  // better keep all fns together in one file where state var is
  useEffect(() => {
    getAllShoutouts(name).then((res) => setShoutouts(res));
  }, [name]);

  // add a shoutout fn
  const addShoutout = (shoutout: Shoutout): void => {
    addNewShoutout(shoutout).then(() => {
      // update UI
      getAllShoutouts().then((res) => setShoutouts(res));
    });
  };

  // const getSingleShoutout = (id: string): void => {
  //   getShoutoutById(id).then((res) => {
  //     res;
  //   });
  // };

  const deleteShoutout = (id: string): void => {
    deleteShoutoutById(id).then(() => {
      // update UI
      getAllShoutouts().then((res) => setShoutouts(res));
    });
  };

  // const updateShoutout = (shoutout: Shoutout): void => {
  //   updateShoutoutById(shoutout).then((res) => {
  //     res;
  //     // update UI
  //     getAllShoutouts().then((res) => setShoutouts(res));
  //   });
  // };
  console.log(shoutouts);
  return (
    <div className="HomeView">
      <h2>{name ? `Shoutouts to ${name}` : `All Shout Outs`}</h2>
      {name && <Link to="/">Back yo All Shout outs</Link>}
      <Link to="/me">My Shoutouts</Link>
      <ListOfShoutouts shoutouts={shoutouts} onDelete={deleteShoutout} />
      <AddForm onAdd={addShoutout} toName={name} />
    </div>
  );
};

export default HomeView;
