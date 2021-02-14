'use strict'

const Order = order => {
    this.id = order.id,
    this.userId = order.userId
}

const OrderDetails = orderDetails => {
    this.id = orderDetails.id,
    this.order_id = orderDetails.order_id,
    this.product_id = orderDetails.product_id,
    this.quantity = orderDetails.quantity
}

module.exports = {Order, OrderDetails};