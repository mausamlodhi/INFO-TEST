module.exports = (sequelize, DataTypes) => {
    const media = sequelize.define('media', {
        name: {
            type: DataTypes.STRING(255)
        },
        basePath: {
            type: DataTypes.STRING(255)
        },
        mediaType: {
            type: DataTypes.STRING(100)
        },
        mediaFor: {
            type: DataTypes.STRING(100)
        },
        userId:{
            type:DataTypes.INTEGER,
            alloNull:false
        }
    });
    media.associate = (models)=>{
        media.hasOne(models.user,{
            foreignKey:'userId'
        })
    }
    return media;
}