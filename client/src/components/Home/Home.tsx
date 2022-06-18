import {
	Container,
	Grid,
	Grow,
	Paper,
	AppBar,
	TextField,
	Button
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Form from '../Form/Form';
import Paginate from '../Pagination';
import Posts from '../Posts/Posts';
import useStyles from './styles';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}
function Home() {
	const query = useQuery();
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const [currentId, setCurrentId] = useState(null);
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);
	// useEffect(() => {
	// 	dispatch(getPosts());
	// }, [dispatch]);
	const handleKeyPress = (e: any) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const searchPost = () => {
		if (search.trim() || tags) {
			dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
			history.push(
				`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
			);
		} else {
			history.push('/');
		}
	};

	const handleAdd = (tag: any) => {
		//@ts-ignore
		return setTags([...tags, tag]);
	};

	const handleDelete = (tagToDelete: any) => {
		console.log(tagToDelete);

		//@ts-ignore
		return setTags(tags.filter((tag: any) => tag !== tagToDelete));
	};

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid
					className={classes.gridContainer}
					container
					justify="space-between"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar
							className={classes.appBarSearch}
							position="static"
							color="inherit"
						>
							<TextField
								name="search"
								variant="outlined"
								label="Search"
								fullWidth
								onKeyPress={handleKeyPress}
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
							<ChipInput
								style={{ margin: '10px 0' }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label="Search Tags"
								variant="outlined"
							/>
							<Button onClick={searchPost} variant="contained" color="primary">
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						{!searchQuery && !tags.length && (
							<Paper className={classes.pagination} elevation={6}>
								<Paginate page={page}></Paginate>
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
}

export default Home;
