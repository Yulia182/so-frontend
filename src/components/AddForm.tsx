import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "./css/AddForm.css";
import Shoutout from "../model/Shoutout";
import UserContext from "../context/UserContext";
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  onAdd: (newShoutout: Shoutout) => void;
  toName?: string;
}

const AddForm = ({ onAdd, toName }: Props) => {
  // controlled components for a form
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const { user } = useContext(UserContext);

  // for an image input, we don't use state here
  // useRef allows to mutate data
  const fileInputRef = useRef<HTMLInputElement>(null);
  // sync with form
  const formRef = useRef<HTMLFormElement>(null);
  const [fbPhotoUrl, setFbPhotoUrl] = useState("");

  // submit form
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const newShoutout: Shoutout = { to, from, text };
    if (user?.photoURL) {
      newShoutout.userPhoto = user.photoURL;
    }
    // have to do it because uploaded img by user are stored locally,
    // and we need to add it to firebase storage
    const files = fileInputRef.current?.files;
    console.log(files); // url of an uploaded img
    // there is always going to be just one image so only at [0]
    if (files && files[0]) {
      //getting img locally
      const newImage = files[0];
      // sending it to firebase
      const storageRef = ref(storage, newImage.name);
      // uploadBytes is async, meaning we have to wait for the Promise to be returned
      uploadBytes(storageRef, newImage).then((uploadRes) => {
        // after sending it to fb, we have to wait for the fb url
        getDownloadURL(uploadRes.ref).then((url) => {
          console.log(url);
          newShoutout.shoutoutImg = url;
          // console.log(newShoutout);
          onAdd(newShoutout);
          setTo("");
          setText("");
        });
      });
    }
  };

  useEffect(() => {
    if (user) {
      setFrom(user?.displayName ?? "");
    } else {
      setFrom("");
    }
  }, [user]);

  useEffect(() => {
    if (toName) {
      setTo(toName);
    } else {
      setTo("");
    }
  }, [toName]);
  return (
    <form className="AddForm" onSubmit={submitHandler} ref={formRef}>
      <h2>Leave a Shout Out</h2>
      <label htmlFor="to">To</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <label htmlFor="from">From</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={user?.displayName ? true : false}
      />
      <label htmlFor="shout-out-text">Shout Out</label>
      <input
        type="textarea"
        name="shout-out-text"
        id="shout-out-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label htmlFor="image">Add an img: </label>
      <input type="file" name="image" id="image" ref={fileInputRef} />
      <button>Submit Shout Out</button>
    </form>
  );
};

export default AddForm;
