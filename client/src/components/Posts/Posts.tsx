import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

function Posts() {
	const posts = useSelector((state: any) => state.posts);
	const classes = useStyles();
	console.log(posts);
	return !posts.length ? (
		<CircularProgress />
	) : (
		<Grid
			className={classes.mainContainer}
			container
			alignItems="stretch"
			spacing={3}
		>
			{posts.map((post: any) => (
				<Grid item key={post._id} xs={12} sm={6}>
					<Post post={post} />
				</Grid>
			))}
		</Grid>
	);
}

export default Posts;