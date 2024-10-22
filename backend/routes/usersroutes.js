const express = require('express');
const router = express.Router();
const userController = require('../controller/userscontroller.js');

// Rute untuk pendaftaran
router.post('/register', userController.register);

// Rute untuk login
router.post('/login', userController.login);

// Middleware untuk autentikasi
router.use(userController.authenticate); // Pastikan middleware autentikasi digunakan sebelum rute yang memerlukan autentikasi

// Rute lainnya yang memerlukan autentikasi
router.get('/profile', (req, res) => {
    // Respon dengan informasi pengguna
    res.json({
        message: 'selamat datang admin',
        userId: req.userId,     // ID pengguna dari token
        userLevel: req.userLevel // Level pengguna dari token
    });
});

router.get('/', userController.authenticate, userController.getAllUsers); //

// Rute untuk menghapus pengguna berdasarkan ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
