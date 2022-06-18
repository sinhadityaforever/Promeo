import { Pagination, PaginationItem } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';
import useStyles from './styles';
//@ts-ignore
function Paginate({ page }) {
	const dispatch = useDispatch();
	const { numberOfPages } = useSelector((state: any) => state.posts);
	const classes = useStyles();
	useEffect(() => {
		if (page) {
			dispatch(getPosts(page));
		}
	}, [page]);
	return (
		<Pagination
			classes={{ ul: classes.ul }}
			count={numberOfPages}
			page={Number(page) || 1}
			variant="outlined"
			color="primary"
			renderItem={(item) => (
				<PaginationItem
					{...item}
					component={Link}
					to={`/posts?page=${item.page}`}
				/>
			)}
		></Pagination>
	);
}

export default Paginate;
