import React from 'react'
import GarexSneakorumLogo from '../components/GarexSneakorumLogo'
import { Helmet } from 'react-helmet';


import './SignIn.css'

const SignIn = () => {

    const pageTitle = "Garex Sneakorum Sign In Page";

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className="vh-100 gradient-custom">

                {/* this div is for the logo and welcome text */}
                <div>
                    <GarexSneakorumLogo />
                    <h1 style={{ textAlign: "center" }}>Welcome to Garex's Sneakorum!</h1>
                </div>

                {/* From this div on, its the portion related to login form. From "Log in" all the way to "Have an account?"*/}
                <div className="login-form">
                    <form action="/signin" method="post">
                        {/* {"{"}% csrf_token %{"}"} */}
                        <h2 className="text-center">Log in</h2>
                        <div className="form-group">
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Username"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">
                                Log in
                            </button>
                        </div>
                        <div className="clearfix">
                            <label className="pull-left checkbox-inline">
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#" className="pull-right">
                                Forgot Password?
                            </a>
                        </div>
                        {/* This part was added to create empty line so that "Have an account" Phrase is slightly lower*/}
                        <div>
                            <label> </label>
                        </div>
                        <div className="clearfix" style={{ textAlign: "center" }}>
                            <label>Don't have an account?</label>
                            <a href="/signup">Register here</a>
                        </div>
                    </form>
                </div>

            </div>
        </>


    )
};

export default SignIn
