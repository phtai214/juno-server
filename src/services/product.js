
import db from '../models';
const cloudinary = require('cloudinary').v2;

export const createNewProduct = async ({ name, description, price, quantity, category }, fileData) => {
    try {
        // Tạo id ngẫu nhiên cho sản phẩm
        const generateRandomNumber = () => {
            const min = Math.pow(10, 5); // 100,000
            const max = Math.pow(10, 6) - 1; // 999,999
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const newId = `${generateRandomNumber()}`;

        // Upload các file ảnh lên Cloudinary
        const uploadedImages = [];
        if (fileData && fileData.length > 0) {
            for (let file of fileData) {
                const result = await cloudinary.uploader.upload(file.path);
                uploadedImages.push(result.secure_url); // Lưu đường dẫn ảnh đã upload
            }
        }

        const newProduct = await db.Product.create({
            id: newId,
            name,
            description,
            price,
            quantity,
            category,
            image_url: JSON.stringify(uploadedImages),
        });

        // Tạo các biến thể cho sản phẩm
        if (variations && variations.length > 0) {
            for (const variation of variations) {
                await db.Variation.create({
                    productId: newProduct.id,
                    size: variation.size,
                    color: variation.color,
                    imageUrl: variation.imageUrl,
                    quantity: variation.quantity,
                });
            }
        }

        return {
            err: 0,
            mes: 'Product created successfully.',
            product: newProduct,
        };
    } catch (error) {
        console.log('check err >>>', error);
        throw error;
    }
};

export const getAllProducts = async (page, limit = 10) => {
    try {
        const skip = (page - 1) * limit;

        // Lấy tất cả sản phẩm với phân trang và bao gồm các biến thể
        const products = await db.Product.findAll({
            offset: skip,
            limit: limit,
            include: [{
                model: db.Variation, // Kết hợp với bảng Variation
                required: false // Nếu bạn muốn lấy cả sản phẩm không có biến thể
            }]
        });

        // Tính tổng số lượng sản phẩm và tổng số trang
        const totalProducts = await db.Product.count();
        const totalPages = Math.ceil(totalProducts / limit);

        return {
            products,
            total: totalProducts, // Tổng số sản phẩm
            total_pages: totalPages, // Tổng số trang
            current_page: page, // Trang hiện tại
        };
    } catch (error) {
        console.log('Error fetching all products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const product = await db.Product.findByPk(id, {
            include: [{
                model: db.Variation, // Bao gồm các biến thể
                required: false
            }]
        });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw error;
    }
};

export const getProductBySlug = async (slug) => {
    try {
        const product = await db.Product.findOne({
            where: { slug },
            include: [{
                model: db.Variation,
                required: false
            }]
        });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (id, updatedData) => {
    try {
        const product = await db.Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }
        await product.update(updatedData);
        return product;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const product = await db.Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }
        await product.destroy();
        return { message: 'Product deleted successfully' };
    } catch (error) {
        throw error;
    }
};