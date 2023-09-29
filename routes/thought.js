const express = require('express');
const ThoughtController = require('../controlmethod/ThoughtController.js');
const router = express.Router();

router.get('/', ThoughtController.listThoughts);
router.post('/', ThoughtController.createThought);
router.get('/:thoughtId', ThoughtController.getThoughtById);
router.put('/:thoughtId', ThoughtController.updateThought);
router.delete('/:thoughtId', ThoughtController.deleteThought);

module.exports = router;
