const { TodoList } = require('../models');

exports.createTodo = async (req, res) => {
    try {
      const { title, complete } = req.body;
      const userId = req.user.id; // Ambil ID pengguna dari token JWT
  
      // Validasi apakah title dan complete ada dalam request body
      if (!title || typeof complete !== 'boolean') {
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
      // Buat tugas baru dalam database
      const newTodo = await TodoList.create({
        title,
        complete,
        UserId: userId, // Hubungkan tugas dengan pengguna yang sesuai
      });
  
      res.status(201).json(newTodo); // Mengembalikan tugas yang baru dibuat
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Fungsi untuk menampilkan detail tugas berdasarkan USERID
exports.getTodoListByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Mengambil daftar tugas berdasarkan userId dari database
        const todos = await TodoList.findAll({
          where: { UserId: userId },
          attributes: ['title', 'complete','id','UserId'], // Memilih atribut yang ingin Anda tampilkan
        });
    
        res.status(200).json(todos);
      } catch (error) {
        console.error('Error fetching todo list by user id:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  };
// Fungsi untuk memperbarui tugas berdasarkan TODOID
exports.updateTodo = async (req, res) => {
  try {
    const userId = req.user.id; // Mengambil USERID dari token JWT
    const todoId = req.params.id; // Mengambil id tugas dari parameter URL

    const existingTodo = await TodoList.findOne({
      where: { id: todoId, UserId: userId },
      attributes: ['title', 'complete','id','UserId'], // Cari tugas berdasarkan id dan userId
    });

    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Update status "complete" tugas berdasarkan userId dan id tugas
    await existingTodo.update({ complete: req.body.complete });

    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Fungsi untuk menghapus tugas berdasarkan TODOID
exports.deleteTodo = async (req, res) => {
    try {
      const userId = req.user.id; // Mengambil USERID dari token JWT
      const todoId = req.params.id; // Mengambil id tugas dari parameter URL
  
      const existingTodo = await TodoList.findOne({
        where: { id: todoId, UserId: userId },
        attributes: ['title', 'complete', 'id', 'UserId'], // Cari tugas berdasarkan id dan userId
      });
  
      if (!existingTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      // Hapus tugas berdasarkan userId dan id tugas
      await existingTodo.destroy();
  
      res.status(204).send(); // Mengembalikan status 204 (No Content) karena tugas telah dihapus
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
