const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    }
})

const purchaseOrderSchema = new Schema({
    books: {
        type: [itemSchema],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['PREPARING', 'BUYED', 'DISPATCHED', 'SHIPPED', 'FINISHED'],
        default: 'PREPARING'
    }
})

const PurchaseOrder = model('PurchaseOrder', purchaseOrderSchema)

module.exports = PurchaseOrder
