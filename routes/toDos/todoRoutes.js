const express = require('express');
const router = express.Router();
const passport = require('passport'); // Import passport

const todoController = require('../../controllers/todoController');

// Rute untuk menampilkan detail tugas berdasarkan ID yang memerlukan otentikasi
router.post('/todos', passport.authenticate('jwt', { session: false }), todoController.createTodo);
router.get('/todos/:userId', passport.authenticate('jwt', { session: false }), todoController.getTodoListByUserId);
router.put('/todos/:id', passport.authenticate('jwt', { session: false }), todoController.updateTodo);
router.delete('/todos/:id', passport.authenticate('jwt', { session: false }), todoController.deleteTodo);


module.exports = router;