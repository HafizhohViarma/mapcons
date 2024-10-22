const express = require('express');
const router = express.Router();
const uploads = require('../midelwares/uploads.js'); // Perbaiki typo 'midelwares' menjadi 'middlewares'
const videoController = require('../controller/videocontroller.js'); // Sesuaikan dengan nama file dan path

// Route untuk menambahkan video
router.post('/videos', uploads.array('video_files'), videoController.createVideo); // Pastikan urutan middleware benar

// Route untuk mendapatkan semua video beserta file
router.get('/videos', videoController.getAllVideos);

// Route untuk mengedit video dan file terkait
router.put('/videos/:id', uploads.array('video_files'), videoController.updateVideo); // Jangan lupa tambahkan middleware untuk upload jika perlu

// Route untuk menghapus video dan file terkait
router.delete('/videos/:id', videoController.deleteVideo);

router.get('/videos/:id', videoController.getVideoById); // Menambahkan route untuk mendapatkan video by ID


module.exports = router;
