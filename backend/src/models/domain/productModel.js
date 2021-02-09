'use strict'

const Product = (product) => {
    this.id = product.id,
    this.title = product.title,
    this.image = product.image,
    this.description = product.description,
    this.price = product.price,
    this.quantity = product.quantity,
    this.short_desc = product.short_desc,
    this.category_id = product.category_id
}

module.exports = Product;