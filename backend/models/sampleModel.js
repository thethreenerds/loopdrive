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

const getSamplesByUser = async (userId) => {
    const query = `
        SELECT id, original_name, filename, filepath, tags, genre, bpm, sample_key, is_public, created_at
        FROM samples
        WHERE user_id = ?
    `;
    const [results] = await db.query(query, [userId]);
    return results;
};

module.exports = { saveSample, getSamplesByUser };