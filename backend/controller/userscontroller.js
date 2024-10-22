const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../models'); // Sesuaikan dengan path model Anda
const upload = require('../config/uploadconfig.js'); // Mengimpor konfigurasi multer

// Secret key untuk JWT
const SECRET_KEY = 'your_secret_key'; // Ganti dengan secret key yang lebih kuat

// Pendaftaran pengguna dengan upload foto profil
exports.register = async (req, res) => {
    try {
        const { nama, email, telp, password, level } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user baru, termasuk path profil jika ada file yang diupload
        const user = await Users.create({
            nama,
            email,
            telp,
            password: hashedPassword,
            profil: req.file ? `/uploads/profil/${req.file.filename}` : null, // Path foto profil
            level
        });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login pengguna
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Bandingkan password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Buat token
        const token = jwt.sign({ id: user.id_user, level: user.level }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Middleware untuk autentikasi
exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }
    
    // Ekstrak token dari header Authorization
    const token = authHeader.split(' ')[1]; // Ambil token setelah "Bearer"
    
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Verifikasi token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err); // Tambahkan log untuk debugging
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Menyimpan ID dan level pengguna di request
        req.userId = decoded.id;
        req.userLevel = decoded.level;
        next(); // Lanjutkan ke route berikutnya
    });
};

// Update foto profil pengguna (admin atau user)
exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params; // Mengambil ID pengguna dari parameter

        const user = await Users.findOne({ where: { id_user: id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update profil dengan foto baru
        user.profil = req.file ? `/uploads/profil/${req.file.filename}` : user.profil;
        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mengambil semua pengguna
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: { exclude: ['password'] } // Menyembunyikan kolom password
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Menghapus pengguna
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Mengambil ID pengguna dari parameter

        const user = await Users.findOne({ where: { id_user: id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await Users.destroy({ where: { id_user: id } });
        res.status(204).send(); // Mengembalikan status 204 No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
