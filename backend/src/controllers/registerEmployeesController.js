import employeesModel from "../models/Employees.js"; //llamamos el modelo
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

//Creamos un array de funciones

//array de metodos (C R U D)
const registerEmployeesController = {};

// INSERT
registerEmployeesController.register = async (req, res) => {
  const {
    name,
    lastName,
    birthday,
    address,
    hireDate,
    email,
    password,
    telephone,
    dui,
    isssNumber,
    isVerified,
  } = req.body;

  try{
    //1- Verificamos si el empleado ya existe
    const existEmployee = await employeesModel.findOne({email})
    if(existEmployee){
        return res.json({message: "Employee already exist"})
    }

    //2- Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10)

    //3-Guardar todo en la tabla Employees
    const newEmployees = new employeesModel({
        name,
        lastName,
        birthday,
        address,
        hireDate,
        email,
        password: passwordHash,
        telephone,
        dui,
        isssNumber,
        isVerified,
    })

    await newEmployees.save();

    //TOKEN
    jsonwebtoken.sign(
        //1- Que voy a guardar
        {id: newEmployees._id},
        //2- secreto
        config.JWT.secret,
        //3- Cuando expira
        {expiresIn: config.JWT.expiresIn},
        //4- Función flecha
    (error, token) =>{
        if(error) console.log("Error" + error)

            res.cookie("authToken", token)
            res.json({message: "Employee saved"})
        }
    )

  }catch(error){
    console.log("Error" + error)
    res.json({message: "Error saving employee"})
  }

};
export default registerEmployeesController;