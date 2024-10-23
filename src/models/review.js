const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Review extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ với User và Product
            Review.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
            Review.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
        }
    }

    Review.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Tên bảng liên kết
                key: 'id' // Khóa chính của bảng Users
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
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        sequelize,
        modelName: 'Review',
        tableName: 'Reviews', // Tên bảng trong cơ sở dữ liệu
        timestamps: false // Tắt timestamps tự động của Sequelize
    });

    return Review;
};
