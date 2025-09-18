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
    query += ' AND genre =?';
    params.push(filters.genre);
  }

  if(filters.bpm) {
    query += ' AND bpm =?';
    params.push(filters.bpm);
  }

  
  if(filters.sample_key) {
    query += ' AND sample_key =?';
    params.push(filters.sample_key);
  }
  
  if (filters.tags) {
    // LIKE filter for tags
    query += ' AND tags LIKE ?';
    params.push(`%${filters.tags}%`);
  }

  query += 'ORDER BY created_at DESC';
  const [rows] = await db.query(query, params);
  return rows;
};



const updateSampleById = async (id, userId, fields) => {
  const allowed = ['genre', 'bpm', 'sample_key', 'tags', 'is_public'];
  const setClause = [];
  const params = [];

  for (let key of allowed){
    if(fields[key] !== undefined) {
      setClause.push(`${key} = ?`);
      params.push(fields[key]);
    }
  }

  if (!setClause.length) return false;
  params.push(id, userId);

  const [result] = await db.query(
    
    `UPDATE samples SET ${setClause.join(', ')} WHERE id = ? AND user_id = ?`,
    params

  );

  return result.affectedRows > 0;
}


const deleteSamplesByIds = async (ids, userId) => {
  if(!ids.length) return 0;

  const placeholders = ids.map(() => "?").join(",");
  const params = [...ids, userId];

  const [result] = await db.query(
     `DELETE FROM samples WHERE id IN (${placeholders}) AND user_id = ?`,
    params
  );
  return result.affectedRows;
};

module.exports = { saveSample, getSamplesByUser, updateSampleById, deleteSamplesByIds };