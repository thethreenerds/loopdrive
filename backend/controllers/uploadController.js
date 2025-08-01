const { saveSample } = require('../models/sampleModel');

exports.handleUpload = async (req, res) => {
    try {
        const { tags, genre, bpm, sample_key, is_public } = req.body;
        const file = req.file;

        if(!file) {
            return res.status(400).json({ message: 'No file Uploaded'});
        }

        const sample = {
            user_id: req.user.id, 
            original_name: file.originalname,
            filename: file.filename,
            filepath: file.path,
            tags: tags || null,
            genre: genre || null,
            bpm: bpm || null,
            sample_key: sample_key || null,
            is_public: is_public === '1' ? 1 : 0
        };

        await saveSample(sample);

        res.status(201).json({ message: 'Upload successful', sample});

    } catch (err) {
        res.status(500).json({ message: 'Upload failed', error: err.message});
    }
};