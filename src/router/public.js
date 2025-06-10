import express from 'express';
import HomePageController from '../controller/public/HomePageController.js';
import ActivityListPageController from '../controller/public/ActivityListPageController.js';
import ActivityDetailPageController from '../controller/public/ActivityDetailPageController.js';
import TeacherListPageController from '../controller/public/TeacherListPageController.js';
import RoomListPageController from '../controller/public/RoomListPageController.js';
import CalendarPageController from '../controller/public/CalendarPageController.js';
import TimetablePageController from '../controller/public/TimetablePageController.js';
import ReservationPageController from '../controller/public/ReservationPageController.js';
import LoginPageController from '../controller/public/LoginPageController.js';

const router = express.Router();

router.get('/', HomePageController.renderPage());

router.get('/actividades', ActivityListPageController.renderPage());
router.get('/actividades/:id', ActivityDetailPageController.renderPage());

router.get('/profesores', TeacherListPageController.renderPage());

router.get('/aulas', RoomListPageController.renderPage());

router.get('/calendario', CalendarPageController.renderPage());

router.get('/horario', TimetablePageController.renderPage());

router.post('/reserva', ReservationPageController.handleSubmit());

router.get('/login', LoginPageController.renderPage());
router.post('/login', LoginPageController.handleSubmit());

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).send('No se pudo cerrar sesión');
        }
        res.redirect('/');
    });
});

router.get('/success', (req, res) => {
    res.render('public/success', {
        title: 'Éxito'
    });
});

export default router;