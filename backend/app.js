//Importo todo lo de la libreria de Express
import express from "express";
import productRoutes from "./src/routes/products.js"

//Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos de la ruta json
app.use(express.json());

//Definir las rutas de las funciones que tendrá la página web
app.use("/api/products", productRoutes);

//Exporto la constante para poder usar express en otros archivos
export default app;

