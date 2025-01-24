const express = require('express');
const ProductManager = require('../managers/productManager');
const validateProduct = require('../middlewares/validateProduct');
const logger = require('../logger');

const router = express.Router();
const productManager = new ProductManager();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getAllProducts();
        res.json(products);
    } catch (error) {
        logger.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Agregar un producto
router.post('/', validateProduct, async (req, res) => {
    try {
        const product = await productManager.addProduct(req.body);
        logger.info(`Producto agregado: ${product.id}`);
        res.status(201).json(product);
    } catch (error) {
        logger.error('Error al agregar producto:', error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

module.exports = router;
