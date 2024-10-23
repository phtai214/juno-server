const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            // Định nghĩa các mối quan hệ ở đây nếu có
        }
    }

    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // Đảm bảo email là duy nhất
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user', 'employee'), // Định nghĩa 3 giá trị có thể cho role
            defaultValue: 'user', // Giá trị mặc định là 'user'
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING
        },
        phonenumber: {
            type: DataTypes.STRING, // Sử dụng STRING để chứa số điện thoại
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};
