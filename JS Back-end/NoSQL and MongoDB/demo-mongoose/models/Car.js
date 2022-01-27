const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: 'Price cannot be negative!'
        }},
    year: {type: Number, required: true},

});

carSchema.methods.getInfo = function () {
    return `Car full info: ${this.name} - Year: ${this.year} - Price: $${this.price}.`
}
carSchema.virtual('VAT').get(function () {
        return this.price * 0.2;
})

module.exports = mongoose.model('Car', carSchema);
