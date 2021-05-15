'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('like', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.DataTypes.INTEGER
        },
        user_id: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id'
          },
        },
        post_id: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: 'post',
            key: 'id'
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DataTypes.DATE
        }
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('like');
  }
};
