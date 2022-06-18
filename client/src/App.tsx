import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Navbar from './components/NavBar/Navbar';
import PostDetails from './components/PostDetails/Postdetails';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
function App() {
	//@ts-ignore
	const user = JSON.parse(localStorage.getItem('profile'));
	if (user) {
		console.log(true);
	}
	return (
		<BrowserRouter>
			<Container maxWidth="xl">
				<Navbar></Navbar>
				<Switch>
					<Route
						path="/"
						exact
						component={() => <Redirect to="/posts" />}
					></Route>
					<Route path="/posts" exact component={Home} />
					<Route path="/posts/search" exact component={Home} />
					<Route path="/posts/:id" component={PostDetails} />
					<Route
						path="/auth"
						exact
						component={() => (!user ? <Auth /> : <Redirect to="posts" />)}
					></Route>
				</Switch>
			</Container>
		</BrowserRouter>
	);
}

export default App;
