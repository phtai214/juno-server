const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class CartItem extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ với Cart và Product
            CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', as: 'cart' });
            CartItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
        }
    }

    CartItem.init({
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Carts', // Tên bảng liên kết
                key: 'id' // Khóa chính của bảng Carts
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products', // Tên bảng liên kết
                key: 'id' // Khóa chính của bảng Products
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'CartItem',
        tableName: 'CartItems', // Tên bảng trong cơ sở dữ liệu
        timestamps: false // Tắt timestamps tự động của Sequelize
    });

    return CartItem;
};
