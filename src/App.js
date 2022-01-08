import './App.css';
import {BrowserRouter as Router , Switch  , Route} from 'react-router-dom'
import Home from './screens/Home';
import UserProfile from './screens/UserProfile';
import Login from './screens/Login';
import fire from './fire'
import Header from './components/UI/matnavbar'
import Apply from './screens/Apply'
import Payment from './components/Payment/Payment'
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
            <Route exact path='/apply' component={Apply} />
            <Route exact path='/payment' component={Payment} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;
