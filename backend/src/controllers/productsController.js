//Array de metodos (C R U D)
const productsController = {};
import { json } from "express";
import Products from "../models/Products.js";

//SELECT
productsController.getProducts = async (req, res) => {
    const products = await Products.find()
    res.json(products)
}

//INSERT
productsController.createProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const newProduct = new Products({name, description, price, stock});
    await newProduct.save()
    res.json({message: "Product saved"});
}

//DELETE
productsController.deleteProducts = async (req, res) => {
    await Products.findOneAndDelete(req.params.id)
    res.json({message: "Product delete"});
}

//UPDATE
productsController.updateProducts = async (req, res) => {
    //Solicito todos los valores
    const {name, description, price, stock} = req.body;
    //Actualizo
    await Products.findByIdAndUpdate(req.params.id, {
        name, 
        description, 
        price, 
        stock
    }, 
    {new: true}
);
    //Muestro un mensaje que todo se actualizo
    res.json({message: "Product update"});
};

export default productsController;