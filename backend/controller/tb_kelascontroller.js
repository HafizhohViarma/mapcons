const { Kelas } = require('../models'); // Pastikan jalur import benar

// Fungsi untuk membuat kelas baru
exports.createKelas = async (req, res) => {
    try {
        const newKelas = await Kelas.create(req.body);
        return res.status(201).json(newKelas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat membuat kelas' });
    }
};

// Fungsi lainnya...

// Fungsi untuk mendapatkan semua kelas
exports.getAllKelas = async (req, res) => {
    try {
        const kelasList = await Kelas.findAll();
        return res.status(200).json(kelasList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data kelas' });
    }
};

// Fungsi untuk mendapatkan kelas berdasarkan ID
exports.getKelasById = async (req, res) => {
    try {
        const { id } = req.params;
        const kelas = await Kelas.findByPk(id);
        if (!kelas) {
            return res.status(404).json({ message: 'Kelas tidak ditemukan' });
        }
        return res.status(200).json(kelas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data kelas' });
    }
};

// Fungsi untuk memperbarui kelas
exports.updateKelas = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Kelas.update(req.body, {
            where: { id_kelas: id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Kelas tidak ditemukan' });
        }
        return res.status(200).json({ message: 'Kelas berhasil diperbarui' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui kelas' });
    }
};

// Fungsi untuk menghapus kelas
exports.deleteKelas = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Kelas.destroy({
            where: { id_kelas: id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Kelas tidak ditemukan' });
        }
        return res.status(200).json({ message: 'Kelas berhasil dihapus' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus kelas' });
    }
};
