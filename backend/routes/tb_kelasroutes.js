const express = require('express');
const router = express.Router();
const kelasController = require('../controller/tb_kelascontroller.js'); // Perbaiki path jika perlu

// Route untuk Kelas
router.post('/kelas', kelasController.createKelas);      // Create
router.get('/kelas', kelasController.getAllKelas);       // Read all
router.get('/kelas/:id', kelasController.getKelasById);  // Read by ID
router.put('/kelas/:id', kelasController.updateKelas);    // Update by ID
router.delete('/kelas/:id', kelasController.deleteKelas);  // Delete by ID

module.exports = router;
