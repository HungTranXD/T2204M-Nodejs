const Brand = require("../models/brand");
const slugify = require("slugify");

exports.get = async (req, res) => {
    try {
        const rs = await Brand.find({});
        res.render("brand/list", {brands: rs});
    } catch (err) {
        res.send(err);
    }
}

exports.create = (req, res) => {
    res.render("brand/create_form");
}

exports.save = async (req, res) => {
    const data = req.body;
    const slug = slugify(data.name, { lower: true }); // Generate slug from name
    const brand = new Brand({ ...data, slug }); // Add the slug to the brand object
    try {
        await brand.save();
        res.redirect("/brands/");
    } catch (error) {
        res.send(error);
    }
}