'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('user', 'admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })

    queryInterface.addColumn('user', 'token', {
      type: Sequelize.DataTypes.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('user', 'admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })

    queryInterface.removeColumn('user', 'token', {
      type: Sequelize.DataTypes.STRING
    })

  }
};
