const db = require("../config/db.config");
const { isEmptyOrNull } = require("../config/service");

const getAll = (req, res) => {
  var sql = "SELECT * FROM order";
  db.query(sql, (error, rows) => {
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
const getOrderByCustomer = (req, res) => {
  var sql =
    "SELECT cart.cart_id, cart.quanity, product.name, product.price " +
    " FROM cart " +
    " INNER JOIN product ON cart.product_id = product.product_id" +
    " WHERE cart.customer_id = ?";
  db.query(sql, (error, rows) => {
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
  db.query("SELECT * FROM order WHERE order_id = ?", [id], (error, rows) => {
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

const create = (req, res) => {
  var {
    customer_id,
    firstname,
    lastname,
    tel,
    email,
    address,
    comment,
    total_order,
    payment_method,
    order_status,
  } = req.body;
  var message = {};
  if (isEmptyOrNull(customer_id)) {
    message.customer_id = "customer_id required!";
  }
  if (isEmptyOrNull(firstname)) {
    message.firstname = "firstname required!";
  }
  if (isEmptyOrNull(lastname)) {
    message.lastname = "lastname required!";
  }
  if (isEmptyOrNull(tel)) {
    message.tel = "tel required!";
  }
  if (isEmptyOrNull(address)) {
    message.address = "address required!";
  }
  if (isEmptyOrNull(total_order)) {
    message.total_order = "total_order required!";
  }
  if (isEmptyOrNull(payment_method)) {
    message.payment_method = "payment_method required!";
  }
  if (isEmptyOrNull(order_status)) {
    message.order_status = "order_status required!";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql =
    "INSERT INTO `order` (customer_id, firstname, lastname, tel, email, address, comment, total_order, payment_method, order_status) VALUES (?,?,?,?,?,?,?,?,?,?)";
  var sqlParam = [
    customer_id,
    firstname,
    lastname,
    tel,
    email,
    address,
    comment,
    total_order,
    payment_method,
    order_status,
  ];
  db.query(sql, sqlParam, (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      // order_id, name,  price, qauntity, total

      // select cart by customer_id => to insert table order_product
      var sql =
        "SELECT  p.name, p.price, c.quantity, (p.price * c.quantity) as total " +
        " FROM cart c" +
        " INNER JOIN product p ON c.poduct_id = p.product_id";
      (" WHERE c.customer_id = ? ");

      db.query(sql, [customer_id], (error1, rows1) => {
        if (!error1) {
          var data = [];
          data = rows1;
          // data = [
          //     {
          //         name : "Macbook Pro 2022",
          //         price :2000,
          //         quantity : 1,
          //         total : 2000
          //     },
          //     {
          //         name : "IPhone X",
          //         price :300,
          //         quantity : 2,
          //         total : 600
          //     },
          // ]

          var sqlOrderProduct =
            "INSERT INTO order_product (order_id, name,  price, qauntity, total ) VALUES (?,?,?,?,?)";
          data.map((item, index) => {
            var paramsSql = [
              rows.insertId,
              item.name,
              item.price,
              item.quantity,
              item.total,
            ];
            db.query(sqlOrderProduct, paramsSql, (error2, rows2) => {
              if (!error2) {
                res.json({
                  message: "You have order successfully!",
                });
              } else {
                res.json({
                  error: true,
                  message: error2,
                });
              }
            });
          });
        }
      });

      res.json({
        message: "Thank you. You have complete order!",
      });
    }
  });
};
const update = (req, res) => {
  var { order_id, order_status } = req.body;
  var message = {};
  if (isEmptyOrNull(order_id)) {
    message.order_id = "order_id required!";
  }
  if (isEmptyOrNull(order_status)) {
    message.order_status = "order_status required!";
  }

  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql = "UPDATE `order` SET order_status=? WHERE order_id = ?";
  var sqlParam = [order_status, order_id];
  db.query(sql, sqlParam, (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        message: "Change status order success!",
      });
    }
  });
};
const remove = (req, res) => {
  var { id } = req.params;
  db.query("DELETE FROM order WHERE order_id = ?", [id], (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        message: "Delete order success!",
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
  getOrderByCustomer,
};
