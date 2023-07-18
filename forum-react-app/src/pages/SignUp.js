import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import GarexSneakorumLogo from '../components/GarexSneakorumLogo';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [pass1, setPass1] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [pass2, setPass2] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object with the form data
    const formData = {
      username: username,
      pass1: pass1,
      pass2: pass2,
      email: email,
      fname: fname,
      lname: lname
    };

    try {
      const response = await fetch(`https://garexsneakorum.onrender.com/forum_api/signup'
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle successful signup
        console.log('Signup successful');
        navigate('/signin'); // Redirect to the signin page
      } else {
        // Handle failed signup
        console.log('Signup failed');
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const pageTitle = "Garex Sneakorum Sign Up Page";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="vh-100 gradient-custom">
        <GarexSneakorumLogo />

        <div className="signup-form">
          <form onSubmit={handleSubmit}>
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
                    required
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="col-xs-6">
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    name="lname"
                    placeholder="Last Name"
                    required
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
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
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="pass1"
                name="pass1"
                placeholder="Password"
                required
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="pass2"
                name="pass2"
                placeholder="Confirm Password"
                required
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="checkbox-inline">
                <input type="checkbox" required /> I accept the{' '}
                <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
              </label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg">
                Sign Up
              </button>
            </div>
          </form>
          <div className="hint-text">
            Already have an account?{' '}
            <a href="/signin" className="custom-link">
              Login here
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
