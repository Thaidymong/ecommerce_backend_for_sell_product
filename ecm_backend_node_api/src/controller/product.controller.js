const db = require("../config/db.config");

const getAll = (req, res) => {
  var text_search = req.query?.text_search;
  console.log(req.query);
  var sql = "SELECT * FROM product";
  if (text_search != null) {
    sql += " WHERE name LIKE '%" + text_search + "%' ";
  }

  db.query(sql, [text_search], (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        list: rows,
      });
    }
  });
};
const getOne = (req, res) => {
  var { id } = req.params;
  db.query(
    "SELECT * FROM product WHERE product_id = ?",
    [id],
    (error, rows) => {
      if (error) {
        res.json({
          error: true,
          message: error,
        });
      } else {
        res.json({
          list: rows,
        });
      }
    }
  );
};
const create = (req, res) => {
  var { category_id, name, description, price, quantity, image } = req.body;
  var message = {}; // Object.keys(message).length == 0 true
  if (category_id == null || category_id == "") {
    message.category_id = "Param category_id required!";
  }
  if (name == null || name == "") {
    message.name = "Please fill in product name!";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }

  var sql =
    "INSERT INTO `product` (category_id,name,description,price,quantity,image) VALUES (?,?,?,?,?,?)";
  var sqlParam = [category_id, name, description, price, quantity, image];
  db.query(sql, sqlParam, (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        message: "Category create success!",
      });
    }
  });
};
const update = (req, res) => {
  var { product_id, category_id, name, description, price, quantity, image } =
    req.body;
  var message = {}; // Object.keys(message).length == 0 true
  if (category_id == null || category_id == "") {
    message.category_id = "Param category_id required!";
  }
  if (name == null || name == "") {
    message.name = "Please fill in product name!";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }

  var sql =
    "UPDATE `product` SET category_id = ?, name=?, description=?, price=?, quantity=?, image=? WHERE product_id = ?";
  var sqlParam = [
    category_id,
    name,
    description,
    price,
    quantity,
    image,
    product_id,
  ];
  db.query(sql, sqlParam, (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        message: "Product update success!",
      });
    }
  });
};
const remove = (req, res) => {
  var { id } = req.params;
  db.query("DELETE FROM product WHERE product_id = ?", [id], (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        message: "Delete product completed!",
      });
    }
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
