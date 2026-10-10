const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', require('./routes/taskRoutes'));

app.use(require('./middleware/notFound'));
app.use(require('./middleware/errorHandler'));

module.exports = app;