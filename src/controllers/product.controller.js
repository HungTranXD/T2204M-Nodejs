const Product = require("./../models/product");

exports.get = async (req, res) => {
    try {
        const rs = await Product.find({});
        res.render("product/list", {products: rs});
    } catch (err) {
        res.send(err);
    }
}

exports.create = (req, res) => {
    res.render("product/create_form");
}

exports.save = async (req, res) => {
    const data = req.body;
    const product = new Product(data);
    try {
        await product.save();
        res.redirect("/products/");
    } catch (error) {
        res.send(error);
    }
}

exports.delete = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId); 

        if (!product) {
            return res.status(404).send("Product not found");
        }

        // Delete the brand document from the database
        await product.deleteOne();
        res.redirect("/products/");
    } catch (error) {
        res.send(error);
    }
}

exports.cart = (req, res) => {
    res.render("cart", { cart: req.session.cart });
}

exports.addToCart = async (req, res) => {
    const productId = req.body.product_id;
    const selectedQuantity = parseInt(req.body.quantity);
  
    try {
      // Check if session already has cart
      if (!req.session.cart) {
        req.session.cart = []; // Create an empty cart if it doesn't exist
      }
  
      // Find the product in the database
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Check if the product already exists in the cart
      const existingProduct = req.session.cart.find((item) => item._id === productId);
  
      if (existingProduct) {
        // If the product already exists, update the quantity
        existingProduct.buyQuantity += selectedQuantity;
      } else {
        // If the product doesn't exist, add it to the cart
        req.session.cart.push({
            ...product.toObject(), // Spread the properties of the product object
            buyQuantity: selectedQuantity,
          });
      }
  
    //   //Check if the selected quantity exceeds the available quantity in the database
    //   if (buyQuantity > product.quantity) {
    //     return res.status(400).json({ message: "Selected quantity exceeds available quantity" });
    //   }
  
      // Save the updated cart in the session
      req.session.save();
  
      res.redirect("/products/cart");
    } catch (error) {
      res.send(error)
    }
  };

  exports.clearCart = async (req, res) => {
    req.session.cart = null;
    res.render("cart", { cart: req.session.cart });
  }

exports.checkout = (req, res) => {
    
}
