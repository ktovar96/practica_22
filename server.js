const mongoose = require('mongoose'); //inyectamos la dependencia de mongoose
const express = require('express'); //inyectamos la dependencia de express
const personsRoutes = require('./routes/person');
mongoose.Promise = global.Promise;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded( {extended:false} ));
app.use(personsRoutes);


mongoose.connect(//crea la conección a la BD
    'mongodb+srv://karla:123@cluster0.p9dla.mongodb.net/?retryWrites=true&w=majority',//Con este link nos podemos conectar a la base de datos que creamos utiizando mongodb atlas
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection; //Evalua si se conectó de forma exitosa a la BD o si da error
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected succesfully");
});

app.listen(3000);  //Se conecta al puerto 3000