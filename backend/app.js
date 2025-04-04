//Importo todo lo de la libreria de Express
import express from "express";
import productRoutes from "./src/routes/products.js"
import branchesRoutes from "./src/routes/branches.js"
import clientsRoutes from "./src/routes/clients.js"
import employeesRoutes from "./src/routes/employees.js"
import reviewsRoutes from "./src/routes/reviews.js"
import registerEmployeesRoutes from "./src/routes/registerEmployees.js";
import cookieParser from "cookie-parser";
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"

//Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos de la ruta json
app.use(express.json());

//Que postman acepte guardar cookies
app.use(cookieParser());

//Definir las rutas de las funciones que tendrá la página web
app.use("/api/products", productRoutes);

app.use("/api/branches", branchesRoutes);

app.use("/api/clients", clientsRoutes);

app.use("/api/employees", employeesRoutes);

app.use("/api/reviews", reviewsRoutes);

app.use("/api/registerEmployees", registerEmployeesRoutes);

app.use("/api/login", loginRoutes);

app.use("/api/logout", logoutRoutes);



//Exporto la constante para poder usar express en otros archivos
export default app;

