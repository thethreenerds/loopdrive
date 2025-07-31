const db = require('../config/db');

const saveSample = async (sample) => {
    const {
        userId,
        original_name,
        filename, 
        filepath,
        genre, 
        bpm,
        sample_key,
        is_public,
    } = sample;

    const query = `
        INSERT INTO samples
        (user_id, original_name, filename, filepath, genre, bpm, sample_key, is_public)
        VALUES (?,?,?,?,?,?,?,?)
    `
    ;

    await db.query(query, [
        userId,
        original_name,
        filename,
        filepath,
        genre || null, 
        bpm || null,
        sample_key || null,
        is_public ? 1 : 0,
    ]);
}

module.exports = { saveSample };