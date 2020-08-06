import * as React from 'react';
import { hot } from 'react-hot-loader';
import TestPage from './screens/TestScreen';

function App(): React.ReactElement {
  return (
    <div>
      {/* <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p> */}

      <TestPage />
    </div>
  );
}

export default hot(module)(App);
