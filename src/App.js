import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginScreen from './pages/LoginScreen';
import RequestAccess from './pages/RequestAccess';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        <Route exact path="/request-access">
          <RequestAccess />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
