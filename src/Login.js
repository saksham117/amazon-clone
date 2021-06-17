import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';

import { auth } from "./firebase"

function Login() {
    const history= useHistory();
    // creating react hooks to store new variables in our state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const signIn = e => {
        e.preventDefault(); // do not refresh the page on clciking the submit button

        // some fancy firebase login stuff
        auth 
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                // if succesfully logged in, got to home page
                history.push('/');
            })
            .catch(error => alert(error.message))

    }

    const register = e => {
        e.preventDefault();

        // do some fancy firebase register stuff 
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password and returned an auth object
                // console.log(auth);
                // if create successful, push us to home page
                if(auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message)) // if there was some error, then it would be handled here
    }




    return (
        <div className='login'>
        <Link to='/'>
            <img 
                src = "http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG"
                className="login__logo"
                />
        </Link>

        <div className="login__container">
            <h1>Sign-In</h1>

            <form action="">
                <h5>E-mail</h5>
                {/* linking our input filed to email varianle via value attribute */}
                {/* as soon as we enter our email, we call onChange, which listens to an event e, calls the setEmail method and passes as argument, the email we have entered */}
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                
                <button 
                type="submit"
                onClick={signIn}
                className="login__signInButton">
                Sign In
                </button>
            </form>

            <p>
                By signing-in you agree to Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest Based Ads. 
            </p>

            <button
            onClick={register} 
            className="login__registerButton">
            Create your Amazon Account
            </button>

        </div>

        </div>
    )
}

export default Login
