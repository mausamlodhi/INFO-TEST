import cors from 'cors'
import bodyParser from 'body-parser';
import models from "./models/index";
import routes from "./routes/index"
export default class Bootstrap{
    constructor(app){
        this.app = app;
        this.middleware();
        this.connectDB();
        this.routes();
        this.start();
    }
    middleware(){
        const { app } = this;
        app.use(cors())
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
    }
    connectDB(){
        const { sequelize } = models;
        sequelize.authenticate()
        .then(()=>{
            sequelize.sync();
            console.log('Database sync succsee');
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    routes(){
        const { app } = this;
        routes(app)
    }
    start(){
        const { app } = this;
        const port = app.get('port');
        const serever =app.listen(port || 5000,()=>{
            console.log("Server started");
        })
    }
}