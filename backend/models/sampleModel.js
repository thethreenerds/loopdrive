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

const getSamplesByUser = async (user_id, filters = {}) => {

  let query = `
    SELECT id, original_name, filename, filepath, tags, genre, bpm, sample_key, is_public, created_at
    FROM samples
    WHERE user_id = ?
  `;

  const params = [user_id];

  //dynamically add filters if they exist

  if(filters.genre) {
    query += 'AND genre =?';
    params.push(filters.genre);
  }

  if(filters.bpm) {
    query += 'AND bpm =?';
    params.push(filters.bpm);
  }

  
  if(filters.sample_key) {
    query += 'AND sample_key =?';
    params.push(filters.sample_key);
  }
  
  if (filters.tags) {
    // LIKE filter for tags
    query += ' AND tags LIKE ?';
    params.push(`%${filters.tags}%`);
  }

  query += 'ORDER BY created_at DESC';
  const [rpws] = await db.query(query, params);
  return rows;
};

module.exports = { saveSample, getSamplesByUser };