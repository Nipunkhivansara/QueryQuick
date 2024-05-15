import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "./components/Authentication/userprofile";
import PromptPageComponent from "./components/PromptPageComponent/PromptPageComponent";
import Landing from "./components/Landing/Landing";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return isLoading ? (
    <h1>Loading....</h1>
  ) : (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <AuthenticatedHome /> : <Navigate to="login" />
            }
          />
          <Route
            path="/login"
            element={isAuthenticated ? <AuthenticatedHome /> : <Landing />}
          />
        </Routes>
      </Router>
    </div>
  );
};

const AuthenticatedHome =()=> {


  console.log(prompt); 

  return (
    <>
      <Navbar />
      <UserProfile />
      <PromptPageComponent />
    

      <Home />
    </>
  );
}

export default App;
