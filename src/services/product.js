
import db from '../models';
const cloudinary = require('cloudinary').v2;

export const createNewProduct = async ({ name, description, price, quantity, category, variations, image, productImages, productDetails }) => {
    try {
        const generateRandomNumber = () => {
            const min = Math.pow(10, 5); // 100,000
            const max = Math.pow(10, 6) - 1; // 999,999
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const newId = `${generateRandomNumber()}`;

        // Tạo slug
        const slug = createSlug(name);

        // Upload ảnh chính lên Cloudinary
        const uploadedMainImage = image ? await cloudinary.uploader.upload(image) : null;

        // Upload các file ảnh bổ sung lên Cloudinary
        const uploadedImages = [];
        if (productImages && productImages.length > 0) {
            for (let file of productImages) {
                const result = await cloudinary.uploader.upload(file);
                uploadedImages.push(result.secure_url);
            }
        }

        // Tạo sản phẩm mới
        const newProduct = await db.Product.create({
            id: newId,
            name,
            description,
            price,
            quantity,
            category,
            slug, // Sử dụng slug đã tạo
            image_url: uploadedMainImage ? uploadedMainImage.secure_url : null,
            additional_images: JSON.stringify(uploadedImages),
        });

        // Tạo các biến thể cho sản phẩm
        if (variations && variations.length > 0) {
            for (const variation of variations) {
                let variationImageUrl = null;
                if (variation.imageUrl) {
                    const uploadedVariationImage = await cloudinary.uploader.upload(variation.imageUrl);
                    variationImageUrl = uploadedVariationImage.secure_url;
                }

                await db.Variation.create({
                    productId: newProduct.id,
                    size: variation.size,
                    color: variation.color,
                    imageUrl: variationImageUrl,
                    quantity: variation.quantity,
                });
            }
        }

        // Tạo chi tiết sản phẩm
        if (productDetails) {
            await db.ProductDetail.create({
                product_code: productDetails.product_code,
                design: productDetails.design,
                material: productDetails.material,
                colors: productDetails.colors,
                origin: productDetails.origin,
                vat_included: productDetails.vat_included,
                productId: newProduct.id
            });
        }

        return {
            err: 0,
            mes: 'Product and details created successfully.',
            product: newProduct,
        };
    } catch (error) {
        console.log('check err >>>', error);
        throw error;
    }
};


// Hàm tạo slug từ tên sản phẩm
export function createSlug(name) {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')        // Thay thế khoảng trắng bằng dấu '-'
        .replace(/[^\w\-]+/g, '')    // Loại bỏ các ký tự đặc biệt
        .replace(/\-\-+/g, '-')      // Thay thế nhiều dấu '-' liên tiếp bằng một dấu '-'
        .trim();
}

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
            where: { slug }, // Sử dụng where để tìm theo slug
            include: [{
                model: db.Variation,
                required: false
            }]
        });
        if (!product) {
            console.error(`Product not found for slug: ${slug}`); // Log thêm thông tin
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        console.error('Error in getProductBySlug:', error); // Log lỗi
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

export const getVariationsByProductId = async (productId) => {
    try {
        const variations = await db.Variation.findAll({
            where: { productId },
        });
        return variations;
    } catch (error) {
        console.log('Error fetching variations:', error);
        throw error;
    }
};

export const updateVariation = async (id, updatedData) => {
    try {
        const variation = await db.Variation.findByPk(id);
        if (!variation) {
            throw new Error('Variation not found');
        }
        await variation.update(updatedData);
        return variation;
    } catch (error) {
        throw error;
    }
};

export const deleteVariation = async (id) => {
    try {
        const variation = await db.Variation.findByPk(id);
        if (!variation) {
            throw new Error('Variation not found');
        }
        await variation.destroy();
        return { message: 'Variation deleted successfully' };
    } catch (error) {
        throw error;
    }
};