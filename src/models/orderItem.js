const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class OrderItem extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ với Order và Variation
            OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
            OrderItem.belongsTo(models.Variation, { foreignKey: 'variation_id', as: 'variation' });
        }
    }

    OrderItem.init({
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Orders', // Tên bảng liên kết
                key: 'id' // Khóa chính của bảng Orders
            }
        },
        variation_id: { // Thay đổi product_id thành variation_id
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Variations', // Tên bảng liên kết
                key: 'id' // Khóa chính của bảng Variations
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'OrderItem',
        tableName: 'OrderItems', // Tên bảng trong cơ sở dữ liệu
        timestamps: false // Tắt timestamps tự động của Sequelize
    });

    return OrderItem;
};