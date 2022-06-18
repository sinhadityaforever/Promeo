import React, { useEffect } from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
//@ts-ignore
function Posts({ setCurrentId }) {
	const { posts, isLoading } = useSelector((state: any) => state.posts);
	const classes = useStyles();
	console.log(posts);
	if (!posts.length && !isLoading) {
		return <p>No Posts</p>;
	}

	return isLoading ? (
		<CircularProgress />
	) : (
		<Grid
			className={classes.mainContainer}
			container
			alignItems="stretch"
			spacing={3}
		>
			{posts.map((post: any) => (
				<Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
					<Post post={post} setCurrentId={setCurrentId} />
				</Grid>
			))}
		</Grid>
	);
}

export default Posts;
