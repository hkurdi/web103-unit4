import pool from './db.js';

const createItemsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS custom_items;

    CREATE TABLE IF NOT EXISTS custom_items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      color VARCHAR(255) NOT NULL,
      package_type VARCHAR(255) NOT NULL,
      engine VARCHAR(255) NOT NULL,
      wheels VARCHAR(255) NOT NULL,
      interior VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating items table:', err);
  }
}

const initDB = async () => { await createItemsTable(); }

initDB();
