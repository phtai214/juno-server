const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class CartItem extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ với Cart và Product
            CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', as: 'cart' });
            CartItem.belongsTo(models.Variation, { foreignKey: 'variation_id', as: 'variation' });
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
        variation_id: { // Sửa đổi trường khóa ngoại
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Variations', // Kết nối tới bảng Variations
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'CartItem',
        tableName: 'CartItems',
        timestamps: false
    });

    return CartItem;
};
