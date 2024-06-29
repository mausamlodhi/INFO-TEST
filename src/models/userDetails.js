module.exports = (sequelize,DataTypes)=>{
    const userDetails = sequelize.define(
        'userDetails',
        {
            email:{
                type:DataTypes.STRING(100),
                allowNull:false,
                trim:true
            },
            mobile:{
                type:DataTypes.STRING(100),
                allowNull:false,
                trim:true
            },
            password:{
                type:DataTypes.STRING(250),
                allowNull:false,
                trim:true
            },
            token:{
                type:DataTypes.STRING(100),
                allowNull:true,
                trim:true
            },
            userId:{
                type:DataTypes.INTEGER,
                allowNull:false
            }
        }
    );
    // userDetails.associate = (models)=>{
    //     userDetails.belongsTo(models.user,{
    //         foreignKey:'userId',
    //     })
    // }
    return userDetails;
}