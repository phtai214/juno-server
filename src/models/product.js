const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Variation, { foreignKey: 'productId' });
            Product.hasOne(models.ProductDetail, { foreignKey: 'productId' });
            Product.hasMany(models.Review, { foreignKey: 'product_id', as: 'reviews' });
        }
    }

    Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image_url: {
            type: DataTypes.JSON,
            allowNull: true
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        tag: {
            type: DataTypes.JSON, // Thay ARRAY bằng JSON
            allowNull: true,
            defaultValue: [] // Mặc định là mảng trống
        },
        flash_sale_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true, // Giá đặc biệt nếu có tag FLASH-SALE
        }
    }, {
        sequelize,
        modelName: 'Product',
        hooks: {
            beforeCreate: (product) => {
                product.slug = createSlug(product.name);
                if (product.tag.includes('FLASH-SALE')) {
                    product.flash_sale_price = applyFlashSalePrice(product.price);
                }
            },
            beforeUpdate: (product) => {
                if (product.changed('name')) {
                    product.slug = createSlug(product.name);
                }
                if (product.changed('tag') && product.tag.includes('FLASH-SALE')) {
                    product.flash_sale_price = applyFlashSalePrice(product.price);
                }
            }
        }
    });

    // Hàm tạo slug từ tên sản phẩm
    function createSlug(name) {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')        // Thay thế khoảng trắng bằng dấu '-'
            .replace(/[^\w\-]+/g, '')    // Loại bỏ các ký tự đặc biệt
            .replace(/\-\-+/g, '-')      // Thay thế nhiều dấu '-' liên tiếp bằng một dấu '-'
            .trim();
    }

    // Hàm tính giá FLASH-SALE (ví dụ giảm 10%)
    function applyFlashSalePrice(price) {
        return price * 0.9; // Giảm 10%
    }

    return Product;
};
