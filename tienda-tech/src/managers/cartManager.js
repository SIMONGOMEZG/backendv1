const fs = require('fs').promises;
const path = './src/data/carts.json';

class CartManager {
    async createCart() {
        const carts = await this.getAllCarts();
        const newCart = { id: Date.now().toString(), products: [] };
        carts.push(newCart);
        await fs.writeFile(path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getAllCarts() {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getAllCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) return null;
        cart.products.push({ productId });
        await fs.writeFile(path, JSON.stringify(carts, null, 2));
        return cart;
    }
}

module.exports = CartManager;
