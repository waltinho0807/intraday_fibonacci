import mongoose from "mongoose";


const Orders = new mongoose.Schema({
    buyorder: {
        type: String
    },
    sellorder: {
        type: String
    },
    price: {
        type: Number
    },
    created: {
        type: Number
    }
});

mongoose.model('orders', Orders);