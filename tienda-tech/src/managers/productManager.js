const fs = require('fs').promises;
const path = './src/data/products.json';

class ProductManager {
    async getAllProducts() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(path, JSON.stringify([], null, 2)); // Crear archivo vacío si no existe
                return [];
            }
            throw new Error('Error al leer los productos');
        }
    }

    async addProduct(product) {
        const products = await this.getAllProducts();
        const newProduct = { id: require('uuid').v4(), ...product };
        products.push(newProduct);
        await this.saveProducts(products);
        return newProduct;
    }

    async saveProducts(products) {
        try {
            await fs.writeFile(path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error('Error al guardar los productos');
        }
    }
}

module.exports = ProductManager;
