import React from 'react';
import Navigation from '../components/Navigation';

const Signup = () => {
    return (
        <div className="signup">
            <h1>Welcome !</h1>
            <h2>Sign up to create an account</h2>
            <form>
            <div className="box1">
                <div className="phTitle" >Email address</div>
                <input className="ph" placeholder="example@mail.com"></input>
            </div>
            <div className="box2">
                <div className="phTitle">Password</div>
                <input type="password" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
            </div>
            <div className="box3">
                <div className="phTitle">Confirmation password</div>
                <input type="password" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
            </div>
            <button className="signup">Sign up</button>
            </form>
            <Navigation />
        </div>
    );
};

export default Signup;