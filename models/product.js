var mongoose = require("mongoose");

//Complete Schema so that while ading new product it should be valid.
// No two products can have same name in Document .
var productSchema = mongoose.Schema({
   name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(value) {
        const productCount = await this.model('Product').countDocuments({ name: value });
        return productCount === 0;
      },
      message: 'Product Name already exists'
    }
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});


const Product = mongoose.model('Product', productSchema);
module.exports = mongoose.model("User", productSchema);;
