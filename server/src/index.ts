require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
import endpoints from './endpoints.config';
import postRoutes from './routes/posts';
const app = express();

app.use('/posts', postRoutes);
app.use(
	bodyParser.json({
		limit: '30mb'
	})
);
app.use(
	bodyParser.urlencoded({
		limit: '30mb',
		extended: true
	})
);
app.use(cors());

mongoose
	.connect(endpoints.dbConnectionUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		app.listen(endpoints.port, () =>
			console.log(`Server running on ${endpoints.port}`)
		);
	})
	.catch((e: Error) => {
		console.log('Error Message: ' + e.message);
	});
