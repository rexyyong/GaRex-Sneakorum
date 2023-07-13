import React from 'react'
import GarexSneakorumLogo from '../components/GarexSneakorumLogo'
import { Helmet } from 'react-helmet';
import GarexNavbar from "../components/GarexNavbar";




import './Home.css'

const Home = () => {

    const pageTitle = "Garex Sneakorum Home Page";

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className="vh-100 gradient-custom">

                {/* this div is for the logo and welcome text */}
                <div>
                    <GarexSneakorumLogo />
                </div>
                <h3>
                    Hello {"{"}
                    {"{"} fname {"}"}
                    {"}"}
                </h3>
                <h4>You are succesfully logged in</h4>
                <button type="submit">
                    <a href="/signout">SignOut</a>
                </button>
                <GarexNavbar />

                <div className="shoeDrops">
                    <h1>Latest Models</h1>
                    <img
                        src="https://drive.google.com/uc?id=1EAvU9vTKAorClBsnNQ86zRiyBAqwZEfb"
                        alt="Nike Paris Dunk"
                        className="center"
                        style={{ marginBottom: "-25px" }}
                    />
                    <h2 style={{ marginBottom: "-15px" }}>Nike MotherFly Model 2</h2>
                    <h2>$6969</h2>
                </div>
            </div>

        </>


    )
};

export default Home