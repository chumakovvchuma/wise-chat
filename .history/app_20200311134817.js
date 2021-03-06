// @ts-nocheck
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from 'body-parser';

import signInRoutes from "./api/routes/signIn";
import signUpRoutes from "./api/routes/signUp";

const app = express();

mongoose.connect('mongodb+srv://chumakovvchuma:chumachuma007@cluster0-irwax.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log("MongoDB server connected !!!!!");
}).catch((err) => {
    console.log("Error : " + err);
});

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Control-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).json({});
    }
    next();
});
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

app.use('/signIn', signInRoutes);
app.use('/signUp', signUpRoutes);

app.use('/', (req, res, next)=>{
    const error = new Error("Not found");
    error.status = 404;
    next(error);
})

app.use('/', (error, req, res, next)=>{
    res.status(500 || error.status);
    res.json({
        message: error.message
    });
})

export default app;