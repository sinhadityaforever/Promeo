import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Navbar from './components/NavBar/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
function App() {
	return (
		<BrowserRouter>
			<Container maxWidth="lg">
				<Navbar></Navbar>
				<Switch>
					<Route path="/" exact component={Home}></Route>
					<Route path="/auth" exact component={Auth}></Route>
				</Switch>
			</Container>
		</BrowserRouter>
	);
}

export default App;
