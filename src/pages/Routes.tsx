import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import App from "pages/App";
import Login from "pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "store";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import authReducer from "store/auth";
import Image from "./Image";

export default function Routes() {
  const user = useSelector((state: ReduxState) => state.auth.user);
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies.token) {
      axios.get("/api/user").then((res) => {
        if (!res.data) return;
        dispatch(authReducer.actions.setUser(res.data));
      });
    }
  }, [dispatch, cookies]);

  return (
    <Router>
      <Switch>
        <Route path="/image/:hex" component={Image} />
        <Route path="/login" component={Login} />
        {!user && <Redirect to="/login" />}
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}
