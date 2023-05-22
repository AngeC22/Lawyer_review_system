import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import pic1 from "../../public/pic1.jpeg";
import LawyerList from "./LawyerList.js";
import getCurrentUser from "../services/getCurrentUser";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import UserProfile from "./UserProfile";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import MapLawyer from "./MapLawyer";
import TopBar from "./layout/TopBar";
import "../assets/scss/main.scss";
import LawyerShow from "./LawyerShow";
import GoogleMap from "./GoogleMap.js";
import ReviewForm from "./ReviewForm.js";
import Review from "./Review";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <div className="container">
            <img src={pic1} alt="Image" />

            <div className="text-overlay">
              <h2>Get help with all of your legal needs</h2>
            </div>
          </div>
          <input onKeyUp={(e) => setSearchQuery(e.target.value)} type="text"></input>
          <Link to={"/searchResult/" + searchQuery}>search</Link>
          <LawyerList />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/review/new" component={ReviewForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/lawyers/:id" component={LawyerShow} />
        <Route path="/searchResult/:searchQueryParam" component={GoogleMap} />
        <Route
          exact
          path="/lawyer/:id"
          render={(props) => <LawyerShow {...props} currentUser={currentUser} />}
        />
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
