module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('TbVideo', {
    id_video: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sampul_video: {
      type: DataTypes.STRING,
      allowNull: true
    },
    judul_video: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keterangan_video: {
      type: DataTypes.STRING,
      allowNull: true
    },
    harga_video: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'tb_video'  // Pastikan nama tabel sesuai
  });
  return Video;
};
