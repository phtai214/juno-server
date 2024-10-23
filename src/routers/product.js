import express from 'express';
import * as controllers from '../controllers/index.js'
import multer from 'multer'; // Thêm multer để xử lý upload file

const router = express.Router();

// Cấu hình multer để upload file
const storage = multer.memoryStorage(); // Sử dụng bộ nhớ tạm thời
const upload = multer({ storage });

// Endpoint để tạo sản phẩm mới
router.post('/create', upload.array('images', 10), controllers.handleCreateNewProduct);
router.get('/products', controllers.getProducts);
router.get('/:id', controllers.getProductById); // Lấy sản phẩm theo ID
router.get('/slug/:slug', controllers.getProductBySlug); // Lấy sản phẩm theo slug
router.put('/:id', controllers.updateProduct); // Cập nhật sản phẩm
router.delete('/:id', controllers.deleteProduct); // Xóa sản phẩm

export default router;
