const mongoose = require('mongoose');

// const addressSchema = new mongoose.Schema({
//     street: String,
//     city: String,
//     state: String,
//     zipCode: String,
// });

// const deliveryTimingsSchema = new mongoose.Schema({
//     open: String,
//     close: String,
// });

// const itemSchema = new mongoose.Schema({
//     itemId: String,
//     name: String,
//     price: Number,
// });

// const menuSchema = new mongoose.Schema({
//     id: String,
//     category: String,
//     items: [itemSchema],
// });

const restaurantSchema = new mongoose.Schema({
    id: String,
    name: String,
    rating: Number,
    foodCategory: [String],
    priceRange: Number,
    restaurantAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
    },
    deliveryTimings: {
        open: String,
        close: String,
    },
    menu: {
        id: String,


        items: [{
            itemId: String,
            name: String,
            price: Number,
        }]
    },
    deliveryRatings: String,
    // menu: [menuSchema],
    images: [{ type: Buffer }],

}

);




module.exports = mongoose.model("fooddata", restaurantSchema)

