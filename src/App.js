import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
// for the routes and their handling
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import Orders from './Orders';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// put our api key as parameter to our loadstripe function
const promise = loadStripe(
  'pk_test_51J2VtuSGfqpNc5ZvVF7FxwsIODTTjAmmaXx7rib61RW3iCoWdH7zgCF0EEgOrwY02XGZ62NydOQOiTPW2tI9Rz9m00iOAgaf4v'
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only eun once when app component loads
    // just like a dynamic if in react
    // its basically a listner
    // it listens always, and becomes activated as soon as it detects a change in the user who is logged in
    auth.onAuthStateChanged(authUser => {

      if (authUser){
        // user just logged in or the user was logged in(like on refreshing, this second condition will work)
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    // we are going to wrap our complete app inside of router
    <Router>
      <div className="App">
      
      {/* for each compnent we are gonna create a separte js file */}
      {/* switch is our like switch case, meaning if our rote is this, go this page ans show these components */}
        <Switch>
        {/* Alwasy make sure that the default route is alwasy at the bottom. Alwasy !@!!!!!!!!!!!!! */}
        <Route path="/orders"> 
            {/* Header - The top component of our Amazon site */}
            <Header />
            <Orders/>
          </Route>
          <Route path="/login"> {/* the route, this route will alwasy be hot if we enter a wrong rour, this is the home route */}
            {/* Header - The top component of our Amazon site */}
            <Login/>
          </Route>

          <Route path="/checkout"> {/* the route, this route will alwasy be hot if we enter a wrong rour, this is the home route */}
            {/* Header - The top component of our Amazon site */}
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment"> {/* the route, this route will alwasy be hot if we enter a wrong rour, this is the home route */}
            {/* Header - The top component of our Amazon site */}
            <Header />
            {/* enclose the payment component inside of element tag which is a higher order funtion */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          
          </Route>

          <Route path="/"> {/* the route, this route will alwasy be hot if we enter a wrong route, this is the home route */}
            {/* Home - This contains all the other components  */} 
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;

