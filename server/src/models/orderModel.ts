import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
    {
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: { type: Number, required: true },
            },
        ],
        shippingAddress: {
            postalCode: { type: String, required: true },
            city: { type: String, required: true },
            district: { type: String, required: true },
            address: { type: String, required: true },
        },
        totalPrice: { type: Number, required: true },
        totalQuantity: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // isDelivered: { type: Boolean, default: false },
        // deliveredAt: { type: Date },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
