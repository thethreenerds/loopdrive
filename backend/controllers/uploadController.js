const { saveSample } = require('../models/sampleModel');

exports.handleUpload = async (req, res) => {
    try {
        const { genre, bpm, sample_key, is_public } = req.body;
        const file = req.file;

        if(!file) {
            return res.status(400).json({ message: 'No file Uploaded'});
        }

        const sample = {
            user_id: req.user.id, 
            original_name: file.original_name,
            filename: file.filename,
            filepath: file.path,
            genre: tags || null,
            bpm: bpm || null,
            sample_key: key || null,
            is_public: 0
        };

        await saveSample(sample);

        res.status(201).json({ message: 'Upload successful', sample});

    } catch (err) {
        res.status(500).json({ message: 'Upload failed', error: err.message});
    }
};