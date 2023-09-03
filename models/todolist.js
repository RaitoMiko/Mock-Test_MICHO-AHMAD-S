'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
// Menentukan bahwa setiap daftar tugas milik satu pengguna (one-to-one)
      TodoList.belongsTo(models.User, {
        foreignKey: 'UserId', // Nama kolom kunci asing di tabel TodoLists
        as: 'user' // Alias untuk akses pengguna pemilik daftar tugas
      });
    }
  }
  TodoList.init({
    title: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TodoList',
  });
  return TodoList;
};