const { saveSample, getSamplesByUser } = require('../models/sampleModel');
const { updateSampleById} = require('../models/sampleModel');

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

exports.getMyUploads = async (req, res) => {
    try {
        const rows = await getSamplesByUser(req.user.id);
        const base = `${req.protocol}://${req.get('host')}`;

        //read to go url for each row

        const data = rows.map(r => ({
            ...r,
            file_url: `${base}/uploads/${r.filename}`
        }));

        res.json(data);
    }catch (err) {
        console.error('Fetch uploads error:', err);
        res.status(500).json({ message: 'Failed to fetch uploads', err});
        
    }
};

    exports.searchSamples = async (req, res) => {
        try {

            const { genre, bpm, sample_key, tags } = req.query;

            const filters = {};
            if (genre) filters.genre = genre;
            if (bpm) filters.bpm = bpm;
            if (sample_key) filters.sample_key = sample_key;
            if (tags) filters.tags = tags;

            const rows = await getSamplesByUser(req.user.id, filters);

            const base = `${req.protocol}://${req.get('host')}`;

            const data = rows.map(r => ({
                ...r,
                file_url: `${base}/uploads/${r.filename}`,
            }));

            res.json(data);
        } catch (err) {
            console.error("Search samples error:", err);
            res.status(500).json({message: "Failed to search samples", error: err.message});
        }
    };

exports.updateSample = async (req, res) => {
    try {
        const sampleId = req.params.id;
        const userId = req.user.id;
        const { genre, bpm, sample_key, tags, is_public} = req.body;

        const updated = await updateSampleById(sampleId, userId, {genre, bpm, sample_key, tags, is_public});

        if(!updated) {

            return res.status(404).json({ message: 'Sample not found'});

        } 

        res.json({ message: 'Sample updated successfully'});


    }catch (err) {
        console.error('Update sample error:', err);
        res.status(500).json({message: 'Failed to update sample', error: err.message });
    }

}

const { deleteSampleById } = require('../models/sampleModel');

exports.deleteSample = async (req, res) => {
    try {
        const sampleId = req.params.id;
        const userId = req.user.id;

        const deleted = await deleteSampleById(sampleId, userId);

        if(!deleted){
            return res.status(404).json({ message: "Sample not found" });

        }
        res.json({message: "Sample deleted successfully"});

        }catch(err){
            console.error("Delete sample error:", err);
            res.status(500).json({message: "Failed to delete sample", error: err.message });
        }
};
