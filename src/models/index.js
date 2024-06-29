import Sequelize from "sequelize";
import fs from 'fs';
import path from "path";
const db = {};
const sequelize = new Sequelize('sparkles_db','root','',{
    host:'localhost',
    dialect:'mysql',
    logging:false
});

fs.readdirSync(__dirname)
.filter((file)=> file.indexOf!=='.' &&  file!=='index.js')
.forEach((file)=>{
    const model = require(path.join(__dirname,file))(
        sequelize,
        Sequelize.DataTypes
    )
    db[model.name] = model;
});
Object.keys(db).forEach((model)=>{
    if(db[model].associate){
        db[model].associate(db);
    }
})
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;