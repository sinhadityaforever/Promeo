import {
	Avatar,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
function Auth() {
	const classes = useStyles();
	const isSignup = false;
	const handleSubmit = () => {};
	const handleChange = () => {};
	const handleShowPassword = () => {
		setShowPassword((prevShowPassword: any) => !prevShowPassword);
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
				</form>
			</Paper>
		</Container>
	);
}

export default Auth;
