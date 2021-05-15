'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('post', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.DataTypes.INTEGER
        },
        writer_id: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id'
          }
        },
        message: {
          allowNull: true,
          type: Sequelize.DataTypes.TEXT
        },
        image_url: {
          allowNull: true,
          type: Sequelize.DataTypes.TEXT,
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
    return queryInterface.dropTable('post');
  }
};
