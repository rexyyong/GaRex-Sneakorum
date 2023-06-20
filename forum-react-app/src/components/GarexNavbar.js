import React from 'react'
import './GarexNavbar.css'

function GarexNavbar() {
    return (
        <div>
            <div className="navigationBar">
                <div className="topnav">
                    <ul>
                        <li>
                            <a href="/home">Home</a>
                        </li>
                        <li>
                            <a href="#AboutUs">About Us</a>
                        </li>
                        <li>
                            <a className="active" href="#Forum">
                                Sneaker Forum
                            </a>
                        </li>
                        {/*<a href="#about">About</a>*/}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default GarexNavbar
