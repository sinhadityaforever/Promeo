import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';

function Posts() {
	const posts = useSelector((state: any) => state.posts);
	const classes = useStyles();
	console.log(posts);
	return (
		<div>
			<Post></Post>
			<Post></Post>
			Posts
		</div>
	);
}

export default Posts;
