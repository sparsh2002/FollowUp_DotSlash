import './App.css';
import {BrowserRouter as Router , Switch  , Route} from 'react-router-dom'
import Home from './screens/Home';
import UserProfile from './screens/UserProfile';
import PostView from './components/Discussions/PostView';
import Login from './screens/Login';
import fire from './fire'
import Header from './components/UI/matnavbar'
import Apply from './screens/Apply'
import Payment from './components/Payment/Payment'
import firebase from 'firebase'
const auth  = fire.auth()


const userId = localStorage.getItem('userId')

function App() {
  const user = firebase.auth().currentUser
  console.log(user)
  return ( 
     
    <div className="App">
    
        {userId? <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route exact path='/userprofile' component={UserProfile} />
            <Route exact path='/apply' component={Apply} />
            <Route exact path='/payment' component={Payment} />
            <Route exact path='/postview' component={PostView} />
          </Switch>
        </Router> : 
        <Router>
        <Route path='/' component={Login} />
        </Router>
        }
    </div> 
     
    
  );
}

export default App;
