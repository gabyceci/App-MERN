//Importamos todas las librerias
import jsonwebtoken from "jsonwebtoken"; //Generar Token
import bcrypt from "bcryptjs"; //Encriptar
import nodemailer from "nodemailer"; //Enviar correo
import crypto from "crypto"; //Generar código

import clientsModel from "../models/Clients.js";
import {config} from "../config.js";

//Array de funciones
const registerClientsController = {};

registerClientsController.registerClient = async (req, res) => {
    // 1- Pedimos las cosas que vamos a guardar
    const {
        name,
        lastName,
        birthday,
        email,
        password,
        telephone,
        dui,
        isVerified,
    } = req.body;

    try {
        //Verificar si el usuario ya existe
        const existClient = await clientsModel.findOne({email})
        if(existClient){
            return res.json({message: "Client already exist"})
        }

        //Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        //Guardamos en la base de datos
        const newClient = new clientsModel({
            name,
            lastName,
            birthday,
            email,
            password: passwordHash,
            telephone,
            dui: dui || null,
            isVerified: isVerified || false,
        })
        await newClient.save()

        // Generar un código de verificación 
        const verificationCode = crypto.randomBytes(3).toString("hex")
        const expireAt = Date.now() + 2 * 60 * 60 * 1000; // 2 horas

        // TOKEN
        jsonwebtoken.sign(
            //1- Que voy a guardar
            {email, verificationCode, expireAt},
            //2- secreto
            config.JWT.secret,
            //3- Cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4- Función flecha
        (error, token) =>{
            if(error) console.log("Error" + error)
                res.cookie("verificationToken", token, {maxAge: 2 * 60 * 60 * 1000}) //Solo si esta validada con https se pone: {httpOnly: true}
                res.json({message: "Client saved"})
            }
        )
    
      }catch(error){
        console.log("Error" + error)
        res.json({message: "Error saving client"})
      }
        
    }
