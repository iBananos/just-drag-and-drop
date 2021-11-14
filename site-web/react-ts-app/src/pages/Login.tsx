import React from 'react';
import { NavLink } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Login = () => {
    return (
        <div className="login">
            <h1>Welcome !</h1>
            <h2>Log in to your account</h2>
            <form>
            <div className="box1">
                <div className="phTitle" >Email address</div>
                <input className="ph" placeholder="example@mail.com"></input>
            </div>
            <div className="box2">
                <div className="phTitle">Password</div>
                <input type="password" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
            </div>
            <button className="signin">Log in</button>
            </form>
            <hr className="hr1"/>
            <div className="or">Or</div>
            <hr className="hr2"/>
            <NavLink to="/signup"><button className="signup">Sign up</button></NavLink>
            <Navigation />
        </div>
    );
};

export default Login;