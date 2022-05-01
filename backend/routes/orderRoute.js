const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const router = express.Router();

const { authenticatedUser, admin} = require("../middleware/authMiddleware");

router.route("/order/new").post(authenticatedUser, newOrder);

router.route("/order/:id").get(authenticatedUser, getSingleOrder);

router.route("/orders/me").get(authenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(authenticatedUser,admin, getAllOrders);

router
  .route("/admin/order/:id")
  .put(authenticatedUser, updateOrder)
  .delete(authenticatedUser, deleteOrder);

module.exports = router;