import Shoutout from "../model/Shoutout";
import ShoutoutView from "./ShoutoutView";

interface Props {
  shoutouts: Shoutout[];
  onDelete: (id: string) => void;
}

const ListOfShoutouts = ({ shoutouts, onDelete }: Props) => {
  return (
    <div className="ListOfShoutouts">
      <ul>
        {shoutouts.map((item) => {
          return (
            <ShoutoutView
              key={item._id}
              shoutout={item}
              deleteShoutout={onDelete}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ListOfShoutouts;
