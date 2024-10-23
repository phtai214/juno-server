const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Cart extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ với User
            Cart.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        }
    }

    Cart.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Tên bảng liên kết
                key: 'id' // Khóa chính của bảng Users
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
    }, {
        sequelize,
        modelName: 'Cart',
        tableName: 'Carts', // Tên bảng trong cơ sở dữ liệu
        timestamps: false // Tắt timestamps tự động của Sequelize
    });

    return Cart;
};
