import db from "../models/index.js";
import bcrypt from 'bcryptjs';
export const createNewUser = async ({ name, email, password }) => {
    try {
        const generateRandomNumber = () => {
            const min = Math.pow(10, 5); // 10^5 = 100,000
            const max = Math.pow(10, 6) - 1; // 10^6 - 1 = 999,999
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const newId = `${generateRandomNumber()}`;

        const newUser = await db.User.findOne({ where: { email } });
        if (newUser) {
            resolve({
                err: 1,
                mes: 'Email has been registered, please use another email',
            });
            return;
        }
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
        const getNewUser = await db.User.create(
            {
                id: newId,
                name,
                email,
                password: hashedPassword,
            }
        )
        return {
            err: 0,
            mes: 'User created successfully.',
            user: getNewUser,
        }
    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}
export const createNewUserEmployee = async ({ name, email, password, position = '', status = 'active', role = '' }) => {
    try {
        const generateRandomNumber = () => {
            const min = Math.pow(10, 5); // 10^5 = 100,000
            const max = Math.pow(10, 6) - 1; // 10^6 - 1 = 999,999
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const newId = `${generateRandomNumber()}`;

        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return {
                err: 1,
                mes: 'Email has been registered, please use another email',
            };
        }
        
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        const newUser = await db.User.create({
            id: newId,
            name,
            email,
            password: hashedPassword,
            position, // Thêm position
            status, // Thêm status
            role
        });

        return {
            err: 0,
            mes: 'User created successfully.',
            user: newUser,
        };
    } catch (error) {
        console.log('check err >>>', error);
        throw error;
    }
}


export const getAllUser = async () => {
    try {
        const allUsers = await db.User.findAll();
        return allUsers
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
}

export const getUserById = async (userId) => {
    try {
        if (!userId) {
            throw new Error('Invalid user ID');
        }
        const user = await db.User.findOne({ where: { id: userId } });
        return user;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Error getting user by ID: ${error.message}`);
    }
}

export const updateUser = async (userId, newData, fileData) => {
    try {
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }

        // Cập nhật dữ liệu mới vào user
        if (newData.name) {
            user.name = newData.name;
        }
        if (newData.email) {
            user.email = newData.email;
        }
        if (newData.address) {
            user.address = newData.address;
        }
        if (newData.role) {
            user.role = newData.role;
        }
        if (newData.phonenumber) {
            user.phonenumber = newData.phonenumber;
        }
        if (newData.status) {
            user.status = newData.status;
        }
        if (fileData !== undefined) {
            user.avatar = fileData.path;
        }


        // Lưu thay đổi vào cơ sở dữ liệu
        await user.save();

        return user;
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}
export const deleteUser = async (userId) => {

    try {
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }
        await user.destroy();
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}
export const updateEmployeePermissions = async (userId, permissions) => {
    try {
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }
        user.permissions = permissions;
        await user.save();
        return user;
    } catch (error) {
        console.error('Lỗi khi cập nhật quyền hạn:', error);
        throw error;
    }
};

// Lấy quyền hạn của một nhân viên
export const getEmployeePermissions = async (userId) => {
    try {
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }
        return user.permissions;
    } catch (error) {
        console.error('Lỗi khi lấy quyền hạn nhân viên:', error);
        throw error;
    }
};

// Xóa một nhân viên
export const deleteEmployee = async (userId) => {
    try {
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }
        await user.destroy();
        return { message: 'Xóa người dùng thành công' };
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        throw error;
    }
};