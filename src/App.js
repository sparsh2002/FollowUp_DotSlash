import './App.css';
import {BrowserRouter as Router , Switch  , Route} from 'react-router-dom'
import Home from './screens/Home';
import UserProfile from './screens/UserProfile';
import Login from './screens/Login';
import fire from './fire'
import Header from './components/UI/matnavbar'
const auth  = fire.auth()
function App() {
  return (
    <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/userprofile' component={UserProfile} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;
