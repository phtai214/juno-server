import { Router } from 'express';
import express from 'express';
import uploadCloud from '../middleware/cloudinary.js'

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());
router.post('/', controllers.creatUser);
router.post('/employee', controllers.creatUserEmployee);
router.get('/', controllers.getAllUser);
router.get('/:id', controllers.getUserById);
router.put('/:id', uploadCloud, controllers.updateUser);
router.delete('/:id', controllers.deleteUser);
// Cập nhật quyền hạn cho nhân viên
router.put('/:id/permissions', controllers.updatePermissions);

// Lấy quyền hạn của một nhân viên
router.get('/permissions/:id', controllers.fetchPermissions);

// Xóa một nhân viên
router.delete('/permissions/:id', controllers.deleteEmployee);



export default router;
