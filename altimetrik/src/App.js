
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Signup from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import store from "./components/store"
function App() {

    return (
      <Provider store={store}>
     <Router>
       <Switch>
         <Route exact path="/"> 
            <SignIn/>
         </Route>
         <Route exact path="/signup"> 
            <Signup/>
         </Route>
         <Route exact path="/dashboard"> 
            <Dashboard/>
         </Route>
       </Switch>
     </Router>
     </Provider>
    )
}

export default App;
