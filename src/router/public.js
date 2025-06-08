import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('public/home', {
        title: 'Home'
    });
});

export default router;