module.exports = (sequelize,DataTypes)=>{
    const address = sequelize.define(
        'address',
        {
            address:{
                type:DataTypes.STRING(200),
                allowNull:false,
                trim:true
            },
            userId:{
                type:DataTypes.INTEGER,
                allowNull:false,
            }
        }
    )
    address.associate = (models)=>{
        address.belongsTo(models.user,{
            foreignKey:'userId',
        })
    }
    return address;
}