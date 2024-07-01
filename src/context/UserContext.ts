import { User } from "firebase/auth";
import { createContext } from "react";

interface UserContextModel {
  user: User | null; // User imported from firebase
}

const defaultValues: UserContextModel = {
  user: null,
};

const UserContext = createContext(defaultValues);

export default UserContext;
