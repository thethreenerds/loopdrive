const db = require('../config/db');

const saveSample = async (sample) => {
    const {
        user_id,
        original_name,
        filename, 
        filepath,
        tags,
        genre, 
        bpm,
        sample_key,
        is_public,
    } = sample;

    const query = `
        INSERT INTO samples
        (user_id, original_name, filename, filepath, tags, genre, bpm, sample_key, is_public)
        VALUES (?,?,?,?,?,?,?,?,?)
    `
    ;

    await db.query(query, [
        user_id,
        original_name,
        filename,
        filepath,
        tags,
        genre, 
        bpm,
        sample_key,
        is_public
    ]);
}

module.exports = { saveSample };