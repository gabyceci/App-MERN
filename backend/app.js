//Importo todo lo de la libreria de Express
import express from "express";
import productRoutes from "./src/routes/products.js"
import branchesRoutes from "./src/routes/branches.js"
import clientsRoutes from "./src/routes/clients.js"
import employeesRoutes from "./src/routes/employees.js"
import reviewsRoutes from "./src/routes/reviews.js"


//Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos de la ruta json
app.use(express.json());

//Definir las rutas de las funciones que tendrá la página web
app.use("/api/products", productRoutes);

app.use("/api/branches", branchesRoutes);

app.use("/api/clients", clientsRoutes);

app.use("/api/employees", employeesRoutes);

app.use("/api/reviews", reviewsRoutes);



//Exporto la constante para poder usar express en otros archivos
export default app;

