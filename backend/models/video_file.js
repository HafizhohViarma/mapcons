module.exports = (sequelize, DataTypes) => {
  const VideoFile = sequelize.define('VideoFile', {
    id_file: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_video: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sub_judul: {
      type: DataTypes.STRING,
      allowNull: true
    },
    video_file: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'video_file'  // Pastikan nama tabel sesuai
  });
  return VideoFile;
};
