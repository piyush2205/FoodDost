const orderItemSchema = new mongoose.Schema({
    itemId: String,
    quantity: Number,
});

const deliveryAddressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
});

const orderSchema = new mongoose.Schema({
    orderId: String,
    user: userSchema, // Reference to the User model
    restaurant: restaurantSchema,
    items: [orderItemSchema],
    total: Number,
    status: String,
    timestamp: Date,
    deliveryAddress: deliveryAddressSchema,
});