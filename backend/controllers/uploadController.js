const { saveSample } = require('../models/sampleModel');

exports.handleUpload = async (req, res) => {
    try {
        const { tags, bpm, key} = req.body;
        const file = req.file;

        if(!file) {
            return res.status(400).json({ message: 'No file Uploaded'});
        }

        const sample = {
            filename: file.filename,
            originalName: file.originalName,
            path: file.path,
            tags,
            bpm,
            key,
            userId: req.user.id,
        };

        await saveSample(sample);

        res.status(201).json({ message: 'Upload successful', sample});

    } catch (err) {
        res.status(500).json({ message: 'Upload failed', error: err.message});
    }
};