// DEPENDENCIES
const express = require('express');
const router = express.Router();

// DATABASE HELPERS
const projectModel = require('../data/helpers/projectModel');

// MIDDLEWARE

// get projects
router.get('/', (req, res) => {
	projectModel
		.get()
		.then(projects => {
			console.log('\n=== RETURNED PROJECTS: ===\n\n', projects, '\n');
			res.status(200).json(projects);
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n', err);
			res
				.status(500)
				.json({ error: 'Projects information could not be retrieved.' });
		});
});

module.exports = router;
