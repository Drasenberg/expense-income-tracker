import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import TrackerPage from "./pages/Tracker";
import Layout from "./layout/Layout";
import DemoTracker from "./pages/DemoTracker";
import Logging from "./pages/Logging";
import { authActions } from "./store/auth";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(authActions.shouldBeLoggedIn());
    return () => {
      dispatch(authActions.logout());
    }
  });

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to='/login-page' />
          </Route>
          <Route path="/demo-tracker">
            <DemoTracker />
          </Route>
          <Route path="/tracker">
            <TrackerPage />
          </Route>
          <Route path="/login-page"> 
            <Logging />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
