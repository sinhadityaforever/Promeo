//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import logo from '../../images/logo.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

function Navbar() {
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const location = useLocation();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		history.push('/');
		setUser(null);
	};
	useEffect(() => {
		const token = user?.token;
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				return logout();
			}
		}
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);
	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<Link
				style={{ textDecoration: 'none' }}
				to="/"
				className={classes.brandContainer}
			>
				<Typography
					component={Link}
					to="/"
					className={classes.heading}
					variant="h2"
					align="center"
				>
					Promeo
				</Typography>
				<img className={classes.image} src={logo} alt="icon" height="40" />
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.result.name}
							src={user.result.imageUrl}
						>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to="/auth"
						variant="contained"
						color="primary"
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
