const productsModel = require("../models/product");

//GETAll products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productsModel.getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

//GET product by id
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsModel.getProductById(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

//Filtro i prodotti in base a titolo o categoria o rating o prezzo
exports.filterProducts = async (req, res, next) => {
  try {
    const { title, category, rating, price } = req.query;
    const products = await productsModel.filterProducts(
      title,
      category,
      rating,
      price
    );
    res.json(products);
  } catch (err) {
    next(err);
  }
};

//---SEZIONE CARRELLO---//
//INSERT INTO CART
exports.insertCart = async (req, res, next) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const result = await productsModel.insertCart(
      user_id,
      product_id,
      quantity
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

//GET CART by user_id
exports.getCart = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const result = await productsModel.getCart(user_id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

//PUT QUANTITY IN CART by user_id and product_id
exports.updateCart = async (req, res, next) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const result = await productsModel.updateCart(
      user_id,
      product_id,
      quantity
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

//DELETE CART by id
exports.deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsModel.deleteCart(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
