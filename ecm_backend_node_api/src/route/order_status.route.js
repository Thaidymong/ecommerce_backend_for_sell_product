const contrl = require("../controller/orderStatus.controller");
const orderStatus = (app) => {
  app.get("/api/order-status/get-all", contrl.getAll);
  app.get("/api/order-status/get-one/:id", contrl.getOne);
  app.post("/api/order-status/create", contrl.create);
  app.put("/api/order-status/update", contrl.update);
  app.delete("/api/order-status/remove/:id", contrl.remove);
};

module.exports = orderStatus;
