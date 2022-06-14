import {
	Avatar,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography
} from '@material-ui/core';
import Icon from './icon';
import { GoogleLogin } from 'react-google-login';
import React, { useState } from 'react';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
function Auth() {
	const initialState = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	};
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const [isSignup, setIsSignup] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (isSignup) {
		} else {
		}
	};
	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleShowPassword = () => {
		setShowPassword((prevShowPassword: any) => !prevShowPassword);
	};
	const switchMode = () => {
		setIsSignup((prevIsSignup: any) => !prevIsSignup);
	};
	const googleSuccess = async (res: any) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		try {
			dispatch({ type: 'AUTH', data: { result, token } });
			history.push('/');
		} catch (error) {}
	};
	const googleFailure = (error: any) => {
		console.log('Google Sign In was unsuccessful');
		console.log(error);
	};
	const [showPassword, setShowPassword] = useState(false);
	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignup ? 'Sign UP' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half
									type={undefined}
									handleShowPassword={undefined}
								></Input>
								<Input
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									half
									autoFocus={undefined}
									type={undefined}
									handleShowPassword={undefined}
								></Input>
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							handleChange={handleChange}
							type="email"
							half={undefined}
							autoFocus={undefined}
							handleShowPassword={undefined}
						></Input>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
							half={undefined}
							autoFocus={undefined}
						></Input>
						{isSignup && (
							<Input
								name="confirmPassword"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
								half={undefined}
								autoFocus={undefined}
								handleShowPassword={undefined}
							/>
						)}
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					<GoogleLogin
						clientId="394066954914-7f8f39kd3a7rmdm1jbsbd0qprjj6fnc0.apps.googleusercontent.com"
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color="primary"
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant="contained"
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy="single_host_origin"
					/>
					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? 'Already have an account? Sign In'
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
}

export default Auth;
