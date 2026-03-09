import { ProductModel } from '../models/Product.js';

const ProductController = {
    getProducts: async (req, res) => {
        try {
            const { category } = req.query;
            const products = await ProductModel.getAllProducts(category);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await ProductModel.getProductById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createProduct: async (req, res) => {
        try {
            const { name, description, price, stock, category, image_url } = req.body;
            if (!name || !price) {
                return res.status(400).json({ message: 'Name and price are required' });
            }
            const product = await ProductModel.createProduct(name, description, price, stock || 0, category, image_url);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { name, description, price, stock, category, image_url } = req.body;
            const product = await ProductModel.updateProduct(req.params.id, name, description, price, stock, category, image_url);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await ProductModel.deleteProduct(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json({ message: 'Product deleted successfully', id: product.id });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default ProductController;
