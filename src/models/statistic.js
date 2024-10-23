const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Statistic extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ với Product
            Statistic.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
        }
    }

    Statistic.init({
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products', // Tên bảng liên kết
                key: 'id' // Khóa chính của bảng Products
            }
        },
        total_sold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 // Giá trị mặc định là 0
        },
        revenue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00 // Giá trị mặc định là 0.00
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Statistic',
        tableName: 'Statistics', // Tên bảng trong cơ sở dữ liệu
        timestamps: false // Tắt timestamps tự động của Sequelize
    });

    return Statistic;
};
