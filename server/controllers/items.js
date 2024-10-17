import pool from "../config/db.js";

const getItems = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM custom_items ORDER BY id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const id = req.params.id; 
    const selectQuery = `
      SELECT name, color, wheels, interior, package_type, engine, price 
      FROM custom_items 
      WHERE id = $1
    `;
    const results = await pool.query(selectQuery, [id]);

    if (results.rows.length === 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, color, wheels, interior, package_type, engine, price } = req.body; 
    const insertQuery = `
      INSERT INTO custom_items (name, color, wheels, interior, package_type, engine, price)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const results = await pool.query(insertQuery, [
      name,
      color,
      wheels,
      interior,
      package_type,
      engine,
      price,
    ]);
    res.status(201).json(results.rows[0]); 
  } catch (error) {
    res.status(409).json({ error: error.message }); 
  }
};

const updateItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id); 
    const { name, color, wheels, interior, package_type, engine, price } = req.body;

    const updateQuery = `
      UPDATE custom_items 
      SET name = $1, color = $2, wheels = $3, interior = $4, package_type = $5, engine = $6, price = $7
      WHERE id = $8
      RETURNING *
    `;
    const results = await pool.query(updateQuery, [
      name,
      color,
      wheels,
      interior,
      package_type,
      engine,
      price,
      id,
    ]);

    if (results.rows.length === 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.status(200).json(results.rows[0]); 
    }
  } catch (error) {
    res.status(409).json({ error: error.message }); 
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id); 
    const deleteQuery = "DELETE FROM custom_items WHERE id = $1 RETURNING *";
    const results = await pool.query(deleteQuery, [id]);

    if (results.rows.length === 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res
        .status(200)
        .json({
          message: "Item deleted successfully",
          deletedItem: results.rows[0],
        });
    }
  } catch (error) {
    res.status(409).json({ error: error.message }); 
  }
};

export default {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
