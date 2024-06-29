module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      trim: true,
    },
  });
  user.associate = (models) => {
    user.hasOne(models.userDetails, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
    user.hasMany(models.address, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
    user.hasMany(models.media,{
        foreignKey:'userId',
        onDelete:'cascade'
    })
  };
  return user;
};
