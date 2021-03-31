import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
    name:  String,
    description: String,
    category:  String,
    price: Number,
    image:  String,
    inCart: Boolean,
    barcode: String
})
const foodModel = mongoose.model("food", foodSchema);
export default foodModel;