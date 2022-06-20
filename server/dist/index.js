"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const endpoints_config_1 = __importDefault(require("./endpoints.config"));
const posts_1 = __importDefault(require("./routes/posts"));
const users_1 = __importDefault(require("./routes/users"));
const test_1 = __importDefault(require("./routes/test"));
const app = express();
app.use(bodyParser.json({
    limit: '30mb'
}));
app.use(bodyParser.urlencoded({
    limit: '30mb',
    extended: true
}));
app.use(cors());
app.use('/posts', posts_1.default);
app.use('/users', users_1.default);
app.use('/test', test_1.default);
mongoose
    .connect(endpoints_config_1.default.dbConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    app.listen(endpoints_config_1.default.port, () => console.log(`Server running on ${endpoints_config_1.default.port}`));
})
    .catch((e) => {
    console.log('Error Message: ' + e.message);
});
