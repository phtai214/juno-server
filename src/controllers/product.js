import * as services from "../services";
import Joi from 'joi';
const cloudinary = require('cloudinary').v2;

export const handleCreateNewProduct = async (req, res) => {
    const fileData = req.files; // Lấy các file ảnh
    const { name, description, price, quantity, category, variations } = req.body; // Các trường từ form

    try {
        // Validate dữ liệu đầu vào
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            category: Joi.string().required(),
            variations: Joi.array().items(Joi.object({
                size: Joi.string().required(),
                color: Joi.string().required(),
                imageUrl: Joi.string().uri(), // Kiểm tra URL hình ảnh nếu có
                quantity: Joi.number().required()
            })).required() // Đảm bảo rằng biến thể là bắt buộc
        });

        const { error } = schema.validate({ name, description, price, quantity, category, variations });
        if (error) {
            if (fileData) {
                fileData.forEach(file => cloudinary.uploader.destroy(file.filename));
            }
            return res.status(400).json({ error: error.details[0].message });
        }

        // Gọi service createNewProduct và truyền fileData
        const result = await services.createNewProduct(req.body, fileData);
        return res.status(200).json(result);
    } catch (error) {
        if (fileData) {
            fileData.forEach(file => cloudinary.uploader.destroy(file.filename));
        }
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error);
    }
};


export const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
        const limit = parseInt(req.query.limit) || 10; // Số sản phẩm trên mỗi trang, mặc định là 10

        const productsData = await services.getAllProducts(page, limit);

        return res.status(200).json(productsData);
    } catch (error) {
        console.error('Error in getProducts controller:', error);
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await services.getProductById(id);
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return res.status(404).json({ error: 'Product not found' });
    }
};

export const getProductBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const product = await services.getProductBySlug(slug);
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        return res.status(404).json({ error: 'Product not found' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; // Dữ liệu cập nhật từ client
    try {
        const product = await services.updateProduct(id, updatedData);
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(404).json({ error: 'Product not found' });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await services.deleteProduct(id);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(404).json({ error: 'Product not found' });
    }
};