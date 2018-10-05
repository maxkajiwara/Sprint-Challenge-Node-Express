// DEPENDENCIES
const express = require('express');

// MIDDLEWARE IMPORTS
const configureMiddleware = require('./middleware/middleware');

// ENDPOINT IMPORTS
const projectRoutes = require('./routes/projectRoutes');
const actionRoutes = require('./routes/actionRoutes');

// SERVER
const server = express();

// MIDDLEWARE
configureMiddleware(server);

// ROUTES
server.use('/api/projects', projectRoutes);

server.use('/api/actions', actionRoutes);

// PORT
const port = 5000;
server.listen(port, () => {
	console.log(`\n=== LISTENING TO PORT ${port} ===\n`);
});
