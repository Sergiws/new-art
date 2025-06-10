import express from 'express';
import upload from '../config/multer.js';
import DashboardPageController from '../controller/admin/DashboardPageController.js';
import RoomListAdminPageController from '../controller/admin/RoomListAdminPageController.js';
import RoomDetailAdminPageController from '../controller/admin/RoomDetailAdminPageController.js';
import TeacherListAdminPageController from '../controller/admin/TeacherListAdminPageController.js';
import TeacherDetailAdminPageController from '../controller/admin/TeacherDetailAdminPageController.js';
import ActivityListAdminPageController from '../controller/admin/ActivityListAdminPageController.js';
import ActivityDetailAdminPageController from '../controller/admin/ActivityDetailAdminPageController.js';
import ReservationListAdminPageController from '../controller/admin/ReservationListAdminPageController.js';
import ReservationDetailAdminPageController from '../controller/admin/ReservationDetailAdminPageController.js';

const router = express.Router();

router.get('/', DashboardPageController.renderPage());

router.get('/aulas', RoomListAdminPageController.renderPage());
router.get('/aulas/aula', RoomDetailAdminPageController.renderPage());
router.post('/aulas/aula', upload.single('image'), RoomDetailAdminPageController.handleSubmit());

router.get('/profesores', TeacherListAdminPageController.renderPage());
router.get('/profesores/profesor', TeacherDetailAdminPageController.renderPage());
router.post('/profesores/profesor', upload.single('image'), TeacherDetailAdminPageController.handleSubmit());

router.get('/actividades', ActivityListAdminPageController.renderPage());
router.get('/actividades/actividad', ActivityDetailAdminPageController.renderPage());
router.post('/actividades/actividad', upload.single('image'), ActivityDetailAdminPageController.handleSubmit());

router.get('/reservas', ReservationListAdminPageController.renderPage());
router.get('/reservas/reserva', ReservationDetailAdminPageController.renderPage());
router.post('/reservas/reserva', ReservationDetailAdminPageController.handleSubmit());

export default router;