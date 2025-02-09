const Sequelize = require('sequelize');
const config = require('../config/dbconfig.js'); 


const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

// Inisialisasi db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import semua model
db.Testi = require('./tb_testi.js')(sequelize, Sequelize.DataTypes);
db.Kelas = require('./tb_kelas.js')(sequelize, Sequelize.DataTypes);
db.Ebook = require('./tb_ebook.js')(sequelize, Sequelize.DataTypes);
db.Transaksi = require('./tb_transaksi.js')(sequelize, Sequelize.DataTypes);
db.Video = require('./tb_video.js')(sequelize, Sequelize.DataTypes);
db.VideoFile = require('./video_file.js')(sequelize, Sequelize.DataTypes);
db.Users = require('./users.js')(sequelize, Sequelize.DataTypes);

// Definisikan relasi antar model

// Relasi antara Users dan Transaksi (id_user)
db.Users.hasMany(db.Transaksi, { foreignKey: 'id_user' });
db.Transaksi.belongsTo(db.Users, { foreignKey: 'id_user' });

// Relasi antara Video dan Transaksi (id_video)
db.Video.hasMany(db.Transaksi, { foreignKey: 'id_video' });
db.Transaksi.belongsTo(db.Video, { foreignKey: 'id_video' });

// Relasi antara Ebook dan Transaksi (id_ebook)
db.Ebook.hasMany(db.Transaksi, { foreignKey: 'id_ebook' });
db.Transaksi.belongsTo(db.Ebook, { foreignKey: 'id_ebook' });

// Relasi antara Kelas dan Transaksi (id_kelas)
db.Kelas.hasMany(db.Transaksi, { foreignKey: 'id_kelas' });
db.Transaksi.belongsTo(db.Kelas, { foreignKey: 'id_kelas' });


// 1 video bisa memiliki banyak file video (sub judul)
db.Video.hasMany(db.VideoFile, { foreignKey: 'id_video' });
db.VideoFile.belongsTo(db.Video, { foreignKey: 'id_video' });

// Sinkronisasi database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Database & tables synchronized!");
  })
  .catch(err => {
    console.error("Error syncing database:", err);
  });

module.exports = db;
