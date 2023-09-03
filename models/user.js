'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Menentukan bahwa setiap pengguna memiliki banyak daftar tugas (one-to-many)
        User.hasMany(models.TodoList, {
          foreignKey: 'UserId', // Nama kolom kunci asing di tabel TodoLists
          as: 'todoLists' // Alias untuk akses daftar tugas pengguna
        });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    idLogin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};