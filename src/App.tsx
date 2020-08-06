import * as React from 'react';
import { hot } from 'react-hot-loader';

function App(): React.ReactElement {
  return (
    <div>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
    </div>
  );
}

export default hot(module)(App);
