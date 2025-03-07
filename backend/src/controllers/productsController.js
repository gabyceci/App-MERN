//Array de metodos (C R U D)
const productsController = {};
import Products from "../models/Products";

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
}