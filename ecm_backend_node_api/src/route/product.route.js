const contrl = require("../controller/product.controller");
const product = (app) => {
  app.get("/api/product/get-all", contrl.getAll);
  app.get("/api/product/get-one/:id", contrl.getOne);
  app.post("/api/product/create", contrl.create);
  app.put("/api/product/update", contrl.update);
  app.delete("/api/product/remove/:id", contrl.remove);
};

module.exports = product;
