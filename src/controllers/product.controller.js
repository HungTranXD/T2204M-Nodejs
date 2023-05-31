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