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

// get project by id
router.get('/:id', (req, res) => {
	const id = req.params.id;
	projectModel
		.get(id)
		.then(project => {
			if (!project) {
				console.log('\n=== NO PROJECT BY THAT ID ===\n');
				return res
					.status(404)
					.json({ message: 'Project with specified ID does not exist.' });
			}
			console.log('\n=== RETURNED PROJECT: ===\n\n', project, '\n');
			res.status(200).json(project);
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n\n', err);
			res
				.status(500)
				.json({ error: 'Project information could not be retrieved.' });
		});
});

// get actions by project id
router.get('/:id/actions', (req, res) => {
	const id = req.params.id;
	projectModel
		.getProjectActions(id)
		.then(actions => {
			if (!actions[0]) {
				console.log('\n=== PROJECT HAS NO ACTIONS ===\n');
				return res
					.status(404)
					.json({ message: 'Project with specified ID has no actions.' });
			}
			console.log('\n=== RETURNED PROJECT ACTIONS: ===\n\n', actions, '\n');
			res.status(200).json(actions);
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n\n', err);
			res
				.status(500)
				.json({ error: 'Project actions could not be retrieved.' });
		});
});

module.exports = router;
