const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  const VideoFile = sequelize.define('VideoFile', {
    id_file: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: () => uuidv4(),
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
