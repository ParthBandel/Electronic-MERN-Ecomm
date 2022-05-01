const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const asyncHandler = require('express-async-handler');

// Create new Order
exports.newOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;
  console.log(req.body);
    const createdOrder = await Order.create({
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      createdOrder,
    });
  });

// get Single Order
exports.getSingleOrder = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new Error("Order not found with this id"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user Orders
exports.myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  console.log(order);
  if (!order) {
    return next(new Error("Order not found with this Id"));
  }

  if (order.orderStatus === "Delivered") {
    return next(new Error("You have already delivered this order"));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.qty);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") { 
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.countInStock -= quantity;

  await product.save({ validateBeforeSave: false }); 
}

// delete Order -- Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new Error("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});