import React from 'react'
import './GarexNavbar.css'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';


function GarexNavbar() {

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            <div className="navigationBar">
                <div className="topnav">
                    <ul>
                        <li>
                            <a href="/home">Home</a>
                        </li>
                        <li>
                            <a href="/about">About Us</a>
                        </li>
                        <li>
                            {/* <a className="active" href="/forum"> */}
                            <a href="/forum">
                                Sneaker Forum
                            </a>
                        </li>
                        {/*<a href="#about">About</a>*/}

                        <li>
                            <div className='d-flex justify-content-end'>
                                <Typography
                                    noWrap
                                    component="a"
                                    // href={`/profile/${user.user_id}`}
                                    href="/profile"
                                >
                                    {/* {user.username} */}
                                    view profile
                                </Typography>
                                <IconButton onClick={handleOpenUserMenu} disableRipple sx={{ color: 'white', p: 0 }}>
                                    <AccountCircleIcon sx={{ fontSize: '3.5rem' }} />
                                    {/* <Avatar alt="Remy Sharp" src={profile?.avatar} /> */}
                                </IconButton>

                                <Menu sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <div>
                                        {/* <MenuItem key='profile' component={Link} to={`/profile/${user['user_id']}`}> */}
                                        <MenuItem key='profile'>
                                            <Link to="/profile" style={{ textDecoration: 'none' }}>
                                                <Typography textAlign="center">View Profile</Typography>
                                            </Link>
                                        </MenuItem>
                                        {/* <MenuItem key='logout' onClick={logoutUser}> */}
                                        <MenuItem key='logout' >
                                            <Typography textAlign="center">Logout</Typography>

                                        </MenuItem>
                                    </div>
                                </Menu>
                            </div>

                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default GarexNavbar
