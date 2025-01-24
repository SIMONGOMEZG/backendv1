const express = require('express');
const CartManager = require('../managers/cartManager');

const router = express.Router();
const cartManager = new CartManager();

// Ruta para crear un carrito
router.post('/', async (req, res) => {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    if (updatedCart) res.json(updatedCart);
    else res.status(404).json({ error: 'Carrito o producto no encontrado' });
});

module.exports = router;
