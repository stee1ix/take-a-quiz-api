const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

//import routes
const authRoute = require('./routes/auth');
const updateRoute = require('./routes/update');
const getStatRoute = require('./routes/getStat');

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// routes
app.get('/', (req, res) => {
	res.send('we are on home');
});

mongoose.connect(process.env.DB_CONNECT, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', _ => {
	console.log('Database connected:', process.env.DB_CONNECT);
});

db.on('error', err => {
	console.error('connection error:', err);
});

//route middlewares
app.use('/auth', authRoute);
app.use('/update', updateRoute);
app.use('/getstat', getStatRoute);

//listening
app.listen(process.env.PORT || 5000, () => {
	console.log('server is listenning on port');
});
