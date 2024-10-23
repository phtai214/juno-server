const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class OrderItem extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ với Order và Product
            OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
            OrderItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
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
