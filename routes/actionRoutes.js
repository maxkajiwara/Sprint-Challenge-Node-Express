// DEPENDENCIES
const express = require('express');
const router = express.Router();

// DATABASE HELPERS
const actionModel = require('../data/helpers/actionModel');

// MIDDLEWARE

// get actions
router.get('/', (req, res) => {
	actionModel
		.get()
		.then(actions => {
			console.log('\n=== RETURNED ACTIONS: ===\n\n', actions, '\n');
			res.status(200).json(actions);
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n', err);
			res
				.status(500)
				.json({ error: 'Actions information could not be retrieved.' });
		});
});

// get action by id
router.get('/:id', (req, res) => {
	const id = req.params.id;
	actionModel
		.get(id)
		.then(action => {
			if (!action) {
				console.log('\n=== NO ACTION BY THAT ID ===\n');
				return res
					.status(404)
					.json({ message: 'Action with specified ID does not exist.' });
			}
			console.log('\n=== RETURNED ACTION: ===\n\n', action, '\n');
			res.status(200).json(action);
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n\n', err);
			res
				.status(500)
				.json({ error: 'Action information could not be retrieved.' });
		});
});

// add new action
router.post('/', (req, res) => {
	const { project_id, description, notes } = req.body;
	const newAction = { project_id, description, notes };
	if (!project_id) {
		console.log(`\n=== PROJECT ID NOT PROVIDED ===\n\n`);
		return res.status(400).json({
			message: 'Please provide a valid project id.'
		});
	}
	if (!description || !notes) {
		console.log(
			`\n=== PROJECT DESCRIPTION AND/OR DESCRIPTION NOT PROVIDED ===\n\n`
		);
		return res.status(400).json({
			message: 'Please provide a description and notes for the project.'
		});
	}
	if (description.length > 128) {
		console.log(
			`\n=== PROJECT DESCRIPTION EXCEEDED 128 CHARACTER LIMIT ===\n\n`
		);
		return res.status(400).json({
			message: 'Project description cannot exceed 128 characters.'
		});
	}

	actionModel
		.insert(newAction)
		.then(action => {
			console.log('\n=== ADDED ACTION: ===\n\n', action, '\n');
			res.status(201).json(action);
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n\n', err);
			res.status(500).json({
				error: 'There was an error while saving the action to the database'
			});
		});
});

// update action by id
router.put('/:id', (req, res) => {
	const { description, notes } = req.body;
	const updatedAction = { description, notes };
	if (!description || !notes) {
		console.log(
			`\n=== PROJECT DESCRIPTION AND/OR DESCRIPTION NOT PROVIDED ===\n\n`
		);
		return res.status(400).json({
			message: 'Please provide a description and notes for the project.'
		});
	}
	if (description.length > 128) {
		console.log(
			`\n=== PROJECT DESCRIPTION EXCEEDED 128 CHARACTER LIMIT ===\n\n`
		);
		return res.status(400).json({
			message: 'Project description cannot exceed 128 characters.'
		});
	}

	const id = req.params.id;
	actionModel
		.update(id, updatedAction)
		.then(action => {
			if (!action) {
				console.log('\n=== NO ACTION BY THAT ID ===\n\n');
				return res.status(404).json({
					message: 'The action with the specified ID does not exist.'
				});
			}
			console.log('\n=== UPDATED ACTION: ===\n\n', action, '\n');
			res.status(200).json({ message: 'Action was successfully updated.' });
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n\n', err);
			res.status(500).json({ error: 'Action could not be modified.' });
		});
});

// delete action by id
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	actionModel
		.remove(id)
		.then(removedAction => {
			if (!removedAction) {
				console.log(`\n=== NO ACTION BY THAT ID ===\n\n`);
				return res
					.status(404)
					.json({ message: 'Action with the specified ID does not exist.' });
			}
			console.log(
				`\n=== DELETED ACTION ===\n\n Action with id ${id} removed from database\n`
			);
			res.status(200).json({ message: 'Action was successfully deleted.' });
		})
		.catch(err => {
			console.log('\n=== SERVER ERROR ===\n\n', err);
			res.status(500).json({ error: 'Action could not be deleted' });
		});
});

module.exports = router;
