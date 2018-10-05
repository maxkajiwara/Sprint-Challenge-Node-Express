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

module.exports = router;
