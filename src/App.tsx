import * as React from "react";
import { hot } from "react-hot-loader";
import { Router, Route, Switch } from "react-router-dom";
import { routes } from "./routes/AppRoutes";
import { ReactQueryDevtools } from "react-query-devtools";
import { createHashHistory } from "history";
import { Grid } from "@material-ui/core";
import SidePanel from "./layouts/SidePanel";
import "./App.css";
import HomeScreen from "./screens/Home/HomeScreen";

/**
 * Create history object to pass into Router,
 * to allow navigating outside of react
 */
const history = createHashHistory();

if (process.env.NODE_ENV === "development") {
  history.listen((location, action) => {
    console.info("HISTORY", action, location);
  });
}

function App(): React.ReactElement {
  return (
    <div>
      <Router history={history}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Grid container spacing={0}>
          <Grid item xs={3} style={{ margin: 0 }}>
            <SidePanel></SidePanel>
          </Grid>

          <Grid item xs={9} style={{ margin: 0 }}>
            <div className="main">
              <div className="inner-main">
                <br />
                <Switch>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      exact
                      path={route.path}
                      component={route.component}
                    />
                  ))}

                  <Route key={""} exact path={""} component={HomeScreen} />
                </Switch>
              </div>
            </div>
          </Grid>
        </Grid>
      </Router>
    </div>
  );
}

export default hot(module)(App);
