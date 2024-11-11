const bodyParser = require('body-parser');
const { app } = require('../server');

app.use('/api/users/*', bodyParser.urlencoded({ extended: true }));

require('./forum');
require('./demo');
