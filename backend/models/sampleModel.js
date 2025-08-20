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

const getSamplesByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT id, original_name, filename, filepath, tags, genre, bpm, sample_key, is_public, created_at
     FROM samples
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [user_id]
  );
  return rows;
};

module.exports = { saveSample, getSamplesByUser };