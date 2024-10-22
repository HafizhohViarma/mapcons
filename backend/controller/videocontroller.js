const db = require('../models'); // Pastikan path sesuai dengan struktur folder
const { Video, VideoFile } = db;

exports.createVideo = async (req, res) => {
    console.log(req.body); // Log untuk memeriksa body request
    const { judul_video, keterangan_video, harga_video, sampul_video } = req.body;

    try {
        // Validasi input
        if (!judul_video) {
            return res.status(400).json({ message: 'Judul video is required' });
        }

        // Tambahkan video ke tb_video
        const newVideo = await Video.create({
            judul_video,
            keterangan_video,
            harga_video,
            sampul_video,
        });

        // Log video baru yang ditambahkan
        console.log('Video added:', newVideo);

        res.status(201).json({ message: 'Video added successfully', video: newVideo });
    } catch (error) {
        console.error('Error adding video:', error);
        res.status(500).json({ message: 'Error adding video', error: error.message });
    }
};

// Mendapatkan semua video beserta file terkait
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.findAll({ // Pastikan model yang digunakan benar
            include: {
                model: VideoFile,
                as: 'files', // Pastikan alias ini sama dengan yang didefinisikan dalam model
            },
        });
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ message: 'Error retrieving videos', error: error.message });
    }
};

// Edit Video (judul, deskripsi, harga di tb_video, dan update file di video_file)
exports.updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul_video, keterangan_video, harga_video } = req.body; // Pastikan data diambil dari req.body
        const videoFiles = req.files; // Ambil files dari req.files

        // Update tb_video
        const video = await Video.findByPk(id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        video.judul_video = judul_video;
        video.keterangan_video = keterangan_video;
        video.harga_video = harga_video;
        await video.save();

        // Update file di video_file (hapus file lama dan tambah file baru)
        if (videoFiles && videoFiles.length > 0) {
            // Hapus file lama
            await VideoFile.destroy({ where: { id_video: id } });

            const videoFilePromises = videoFiles.map(file => {
                return VideoFile.create({
                    id_video: id,
                    sub_judul: file.originalname,
                    video_file: file.filename,
                });
            });

            await Promise.all(videoFilePromises);
        }

        res.status(200).json({ message: 'Video updated successfully', video });
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ message: 'Error updating video', error: error.message });
    }
};

// Hapus Video (dan file terkait di video_file)
exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;

        // Cari video
        const video = await Video.findByPk(id); // Pastikan model yang digunakan benar
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Hapus semua file terkait di video_file
        await VideoFile.destroy({ where: { id_video: id } });

        // Hapus video dari tb_video
        await video.destroy();

        res.status(200).json({ message: 'Video and related files deleted successfully' });
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ message: 'Error deleting video', error: error.message });
    }
};


