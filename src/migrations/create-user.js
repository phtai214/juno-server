'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            role: {
                type: Sequelize.ENUM('admin', 'user', 'employee'), // Sử dụng ENUM với 3 giá trị
                defaultValue: 'user', // Mặc định là 'user'
                allowNull: false
            },
            avatar: {
                type: Sequelize.STRING
            },
            phonenumber: {
                type: Sequelize.STRING,
                allowNull: true
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true
            },
            status: {
                type: Sequelize.ENUM('active', 'inactive'), // Sử dụng ENUM cho trạng thái
                defaultValue: 'active', // Mặc định là 'active'
                allowNull: false
            },
            position: {
                type: Sequelize.STRING, // Lưu chức vụ của nhân viên
                allowNull: true
            },
            permissions: {
                type: Sequelize.JSON, // Lưu chức vụ của nhân viên
                allowNull: true,
                defaultValue: {}
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },

    async down(queryInterface, Sequelize) {
        // Khi rollback, cần xóa bảng 'Users' và ENUM 'role', 'status'
        await queryInterface.dropTable('Users');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_status";'); // Xóa ENUM 'status'
    }
};
