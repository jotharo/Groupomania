
module.exports = (sequelize, DataTypes) => {
    const like = sequelize.define('comment', {
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
          commentMessage: {
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'comment_message'
          },
    }, {
      timestamps: true,
      freezeTableName: true
    })
  
    like.associate = function(models) {
        comment.belongsTo(models.user, { foreignKey: 'userId' })
        comment.belongsTo(models.post, { foreignKey: 'postId' })
    }
  
    return comment
  }