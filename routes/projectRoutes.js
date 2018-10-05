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

// add new project
router.post('/', (req, res) => {
	const { name, description } = req.body;
	if (!name || !description) {
		console.log(`\n=== PROJECT NAME AND/OR DESCRIPTION NOT PROVIDED ===\n\n`);
		return res.status(400).json({
			message: 'Please provide a name and description for the project.'
		});
	}

	if (name.length > 128) {
		console.log(`\n=== PROJECT NAME EXCEEDED 128 CHARACTER LIMIT ===\n\n`);
		return res.status(400).json({
			message: 'Project name cannot exceed 128 characters.'
		});
	}

	projectModel
		.insert({ name, description })
		.then(project => {
			if (!project) {
				console.log('\n=== FAILED TO ADD PROJECT ===\n');
				return res
					.status(500)
					.json({ error: 'Failed to add the project to the database.' });
			}
			console.log('\n=== ADDED PROJECT: ===\n\n', project, '\n');
			res.status(201).json(project);
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n\n', err);
			res.status(500).json({
				error: 'There was an error while saving the project to the database'
			});
		});
});

// update project by id
router.put('/:id', (req, res) => {
	const { name, description } = req.body;
	if (!name || !description) {
		console.log(`\n=== PROJECT NAME AND/OR DESCRIPTION NOT PROVIDED ===\n\n`);
		return res.status(400).json({
			message: 'Please provide a name and description for the project.'
		});
	}

	if (name.length > 128) {
		console.log(`\n=== PROJECT NAME EXCEEDED 128 CHARACTER LIMIT ===\n\n`);
		return res.status(400).json({
			message: 'Project name cannot exceed 128 characters.'
		});
	}

	projectModel
		.update({ name, description })
		.then(updatedProject => {
			if (!updatedProject) {
				console.log('\n=== NO PROJECT BY THAT ID ===\n\n');
				return res
					.status(404)
					.json({ message: 'Project with the specified ID does not exist.' });
			}
			console.log(
				`\n=== UPDATED PROJECT ===\n\n Project with id ${
					req.params.id
				} has been updated\n`
			);
			res.status(200).json({ message: 'Project was successfully updated.' });
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n\n', err);
			res.status(500).json({ error: 'Project could not be modified.' });
		});
});

// delete project by id
router.delete('/:id', (req, res) => {
	projectModel
		.remove(req.params.id)
		.then(removedProject => {
			if (!removedProject) {
				console.log(`\n=== NO PROJECT BY THAT ID ===\n\n`);
				return res
					.status(404)
					.json({ message: 'Project with the specified ID does not exist.' });
			}
			console.log(
				`\n=== DELETED PROJECT ===\n\n Project with id ${
					req.params.id
				} removed from db('projects')\n`
			);
			res.status(200).json({ message: 'Project was successfully deleted.' });
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n\n', err);
			res.status(500).json({ error: 'Project could not be deleted' });
		});
});

module.exports = router;
