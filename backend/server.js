const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models'); 

const app = express();

// Middleware untuk memudahkan parsing request body (JSON dan URL-encoded)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware CORS (untuk mengizinkan akses dari domain yang berbeda)
app.use(cors());

// Simple route untuk tes
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di aplikasi API kami!' });
});

// Import dan gunakan routes (Anda bisa tambahkan routes Anda di sini)
const userRoutes = require('./routes/usersroutes.js'); 
app.use('/api/users', userRoutes); 

const videoRoutes = require('./routes/videoroutes.js');
app.use('/api', videoRoutes);

const kelasRoutes = require('./routes/tb_kelasroutes.js');
app.use('/api', kelasRoutes); 
// Port dimana server akan dijalankan
const PORT = process.env.PORT || 8082;

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}.`);
});

// Sinkronisasi database dan jalankan server
db.sequelize.sync().then(() => {
  console.log('Database berhasil disinkronisasi.');
}).catch(err => {
  console.error('Gagal sinkronisasi database:', err.message);
});
