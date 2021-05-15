
module.exports = (sequelize, DataTypes) => {
    const like = sequelize.define('like', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'user_id'
          },
          postId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'post_id'
          },
    }, {
      timestamps: true,
      freezeTableName: true
    })
  
    like.associate = function(models) {
        like.belongsTo(models.user, { foreignKey: 'userId' })
        like.belongsTo(models.post, { foreignKey: 'postId' })
    }
  
    return like
  }