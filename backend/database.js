import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import {config} from "./src/config.js"
//1- Configuro la URI o direccion de la base de datos

//2- Conecto la base de datos
mongoose.connect(config.db.URI);

//-----------------Comprobar todo------------------------------

//3- Creo una constante que es igual a la conexión
const connection = mongoose.connection;

//Veo si funciona
connection.once("open", () => {
    console.log("DB is connected");
});


//Veo si se desconectó
connection.once("disconnected", () => {
    console.log("DB is disconnected");
});


//Veo si hay un error
connection.once("error", (error) => {
    console.log("Error found" + error);
});