module.exports = (sequelize, DataTypes) => {
    const Testi = sequelize.define('tb_testi', {
      id_testi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama_peserta: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sampul: {
        type: DataTypes.STRING,
        allowNull: true
      },
      testimoni: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      timestamps: false,
      tableName: 'tb_testi'
    });
    return Testi;
  };
  