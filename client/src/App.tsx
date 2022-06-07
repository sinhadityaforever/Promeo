import React from 'react';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './styles';
function App() {
	const classes = useStyles();
	return (
		<Container maxWidth="lg">
			<AppBar className={classes.appBar} position="static" color="inherit">
				<Typography className={classes.heading} variant="h2" align="center">
					Promeo
				</Typography>
				<img
					className={classes.image}
					src={'google.com'}
					alt="memories"
					height="60"
				></img>
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						justify="space-between"
						alignItems="stretch"
						spacing={3}
					>
						<Grid item xs={12} sm={7}>
							<Posts></Posts>
						</Grid>
						<Grid item xs={12} sm={4}></Grid>
						<Form></Form>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;
