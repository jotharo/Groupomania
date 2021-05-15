
module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('post', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          writerId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'writer_id'
          },
          message: {
            allowNull: true,
            type: DataTypes.TEXT
          },
          imageUrl: {
            allowNull: true,
            type: DataTypes.TEXT,
            field :'image_url'
          },
    }, {
      timestamps: true,
      freezeTableName: true
    })
  
    post.associate = function(models) {
        post.belongsTo(models.user, {foreignKey: 'writerId'})
        post.hasMany(models.like, {foreignKey: 'postId'})
        post.hasMany(models.comment, {foreignKey: 'postId'})
    }
  
    return post
  }