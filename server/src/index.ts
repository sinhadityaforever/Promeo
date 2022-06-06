require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
import endpoints from './endpoints.config';

const app = express();
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
console.log('helloo' + endpoints.dbConnectionUrl);
