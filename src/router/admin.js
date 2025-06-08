import express from 'express';
import upload from '../config/multer.js';
import RoomListAdminPageController from '../controller/admin/RoomListAdminPageController.js';
import RoomDetailAdminPageController from '../controller/admin/RoomDetailAdminPageController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/dashboard', { pagina: 'Panel de Administración' });
});

router.get('/aulas', RoomListAdminPageController.renderPage());
router.get('/aulas/aula', RoomDetailAdminPageController.renderPage());
router.post('/aulas/aula', upload.single('image'), RoomDetailAdminPageController.handleSubmit());

export default router;