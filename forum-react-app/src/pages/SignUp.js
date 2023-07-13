import React from 'react'
import GarexSneakorumLogo from '../components/GarexSneakorumLogo'
import { Helmet } from 'react-helmet';

import './SignUp.css'

const SignUp = () => {

    const pageTitle = "Garex Sneakorum Sign Up Page";

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className="vh-100 gradient-custom">

                {/* this div is for the logo and welcome text */}
                <div>
                    <GarexSneakorumLogo />
                    {/* <h1 style={{ textAlign: "center" }}>Welcome to Garex's Sneakorum!</h1> */}
                </div>

                <div className="signup-form">
                    <form action="/signup" method="post">
                        {/* {"{"}% csrf_token %{"}"} */}
                        <h2>Sign Up</h2>
                        <p>Please fill in this form to create an account!</p>
                        <hr />
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fname"
                                        name="fname"
                                        placeholder="First Name"
                                        required="required"
                                    />
                                </div>
                                <div className="col-xs-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lname"
                                        name="lname"
                                        placeholder="Last Name"
                                        required="required"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="username"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                id="pass1"
                                name="pass1"
                                placeholder="Password"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                id="pass2"
                                name="pass2"
                                placeholder="Confirm Password"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <label className="checkbox-inline">
                                <input type="checkbox" required="required" /> I accept the{" "}
                                <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
                            </label>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    {/* href I changed to signin, so that it works when user presses login here button. But by right it should not be this*/}
                    <div className="hint-text">
                        Already have an account? <a href="signin" className="custom-link">Login here</a>
                    </div>
                </div>



            </div>
        </>
    )
};

export default SignUp