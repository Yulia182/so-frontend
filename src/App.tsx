import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import HomeView from "./components/HomeView";
import ShoutoutView from "./components/ShoutoutView";
import TopFive from "./components/TopFive";
import { sighInWithGoogle, signOutWithGoogle } from "./firebaseConfig.ts";
import { useContext } from "react";
import UserContext from "./context/UserContext.ts";
import My from "./components/My.tsx";

function App() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="App">
      {user === null ? (
        <button onClick={sighInWithGoogle}>Sign in With Google</button>
      ) : (
        <>
          <p>Welcome, {user.displayName}</p>
          <img src={user.photoURL ?? ""} alt="" />
          <button onClick={signOutWithGoogle}>Sign out</button>
        </>
      )}
      <Router>
        <Routes>
          {/* React URI which user see in the browser */}
          {/* client side */}
          {/* API calls on another side , are backend, and whatever URI is in 
          the services file, it is different, you won't send that link to a friend to see
          your website, It will be on service side, and that what you put in postman*/}
          <Route path="/" element={<HomeView />} />
          <Route path="/user/:name" element={<HomeView />} />
          <Route path="/shoutouts/:id" element={<ShoutoutView />} />
          <Route path="/top-five" element={<TopFive />}></Route>
          <Route path="/me" element={<My />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
