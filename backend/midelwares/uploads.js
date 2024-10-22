const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan untuk multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Tentukan folder tempat file akan disimpan
        cb(null, 'uploads/'); // Pastikan folder 'uploads/' ada
    },
    filename: (req, file, cb) => {
        // Menentukan nama file yang diupload
        cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp untuk menghindari nama file duplikat
    }
});

// Inisialisasi multer dengan konfigurasi storage
const uploads = multer({ storage: storage });

module.exports = uploads;
