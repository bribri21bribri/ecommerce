import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
