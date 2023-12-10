const e = require("express");
const pool = require("../db");

exports.getAllProducts = async () => {
  const connection = await pool.getConnection();
  const [result] = await connection.query("SELECT * FROM products");
  connection.release();
  return result;
};

exports.getProductById = async (id) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );
  connection.release();
  return result;
};

//Filtro i prodotti in base a titolo o categoria o rating o prezzo
exports.filterProducts = async (title, category, rating, price) => {
  let query = "SELECT * FROM products WHERE ";
  let values = [];
  let conditions = [];

  if (title) {
    conditions.push("title LIKE ?");
    values.push(`%${title}%`);
  }

  if (category) {
    conditions.push("category LIKE ?");
    values.push(`%${category}%`);
  }

  if (rating && rating !== "0") {
    conditions.push("rating LIKE ?");
    values.push(`%${rating}%`);
  }

  if (price && price !== "0") {
    conditions.push("price >= ?");
    values.push(price);
  }

  // Se non sono presenti condizioni, rimuovo il WHERE dalla query
  if (conditions.length === 0) {
    query = "SELECT * FROM products";
  } else {
    query += conditions.join(" AND ");
  }

  const connection = await pool.getConnection();
  const [result] = await connection.query(query, values);
  connection.release();

  return result;
};

//---SEZIONE CARRELLO---//
//INSERT INTO CART
exports.insertCart = async (user_id, product_id, quantity) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
    [user_id, product_id, quantity]
  );
  connection.release();
  return result;
};

//GET CART by user_id and product_id
exports.getCart = async (user_id) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    "SELECT users.username, users.name, products.title, products.category, products.price, products.rating, cart.quantity, cart.id FROM cart JOIN users ON cart.user_id = users.id JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?",
    [user_id]
  );
  connection.release();
  return result;
};

//PUT QUANTITY IN CART by user_id and product_id
exports.updateCart = async (user_id, product_id, quantity) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
    [quantity, user_id, product_id]
  );
  connection.release();
  return result;
};

//DELETE CART by id
exports.deleteCart = async (id) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query("DELETE FROM cart WHERE id = ?", [
    id,
  ]);
  connection.release();
  return result;
};
