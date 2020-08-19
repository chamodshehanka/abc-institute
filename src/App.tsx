import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { routes } from "./routes/AppRoutes";
import { ReactQueryDevtools } from "react-query-devtools";

function App(): React.ReactElement {
  return (
    <div>
      <Router>
        <ReactQueryDevtools initialIsOpen={false} />
        {routes.map((route) => (
          <Route
            key={route.path}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
      </Router>
    </div>
  );
}

export default hot(module)(App);
