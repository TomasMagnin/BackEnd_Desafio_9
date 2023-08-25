import express from "express";
import { isAdmin, isUser } from "../middlewares/auth.js";
import { ProductsController } from '../controllers/products.controller.js';
const productsController = new ProductsController();


export const productsRouter = express.Router();

productsRouter.get('/mockingproducts', productsController.mock);
productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:pid', productsController.getProductById);
productsRouter.post('/', isAdmin, productsController.createProduct);
productsRouter.put('/:id', isAdmin, productsController.updateProduct);
productsRouter.delete('/:id', isAdmin, productsController.deleteProduct);
