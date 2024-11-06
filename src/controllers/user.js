import * as services from '../services';
export const creatUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const result = await services.createNewUser({ name, email, password })
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const creatUserEmployee = async (req, res) => {
    const { name, email, password, position, status, role } = req.body; // Thêm position và status
    try {
        const result = await services.createNewUserEmployee({ name, email, password, position, status,role }); // Truyền position và status
        res.json(result);
    } catch (error) {
        console.error('Error creating user:', error); // Ghi lại lỗi nếu có
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await services.getAllUser();
        res.json(users)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}

export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await services.getUserById(userId);
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const newData = req.body;
    const fileData = req.file; // Lấy dữ liệu file ảnh từ request

    try {
        if (fileData) {
            // Nếu có ảnh mới được tải lên
            // Xóa ảnh cũ trên cơ sở dữ liệu và Cloudinary
            const user = await services.getUserById(userId);
            if (user && user.avatar) {
                // Xóa ảnh cũ trên Cloudinary
                const publicId = user.avatar.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
            // Cập nhật đường dẫn ảnh mới vào newData
            newData.avatar = fileData.path;
        }

        const user = await services.updateUser(userId, newData, fileData);
        res.status(200).json({ message: 'Cập nhật thông tin người dùng thành công', user });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        await services.deleteUser(userId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: `Error deleting user by ID: ${error.message}` });
    }
}
export const updatePermissions = async (req, res) => {
    try {
        const { id } = req.params;
        const { permissions } = req.body;
        const updatedUser = await services.updateEmployeePermissions(id, permissions);
        res.status(200).json({
            message: 'Cập nhật quyền hạn thành công',
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật quyền hạn', error: error.message });
    }
};

// Lấy quyền hạn của một nhân viên
export const fetchPermissions = async (req, res) => {
    try {
        const { id } = req.params;
        const permissions = await services.getEmployeePermissions(id);
        res.status(200).json({ permissions });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy quyền hạn nhân viên', error: error.message });
    }
};

// Xóa một nhân viên
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.deleteEmployee(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa người dùng', error: error.message });
    }
}