const Category = require("../models/category");
const slugify = require("slugify");

exports.get = async (req, res) => {
    try {
        const rs = await Category.find({});
        res.render("category/list", {categories: rs});
    } catch (err) {
        res.send(err);
    }
}

exports.create = (req, res) => {
    res.render("category/create_form");
}

exports.save = async (req, res) => {
    const data = req.body;
    const slug = slugify(data.name, { lower: true }); // Generate slug from name
    const category = new Category({ ...data, slug }); // Add the slug to the category object
    try {
        await category.save();
        res.redirect("/categories/");
    } catch (error) {
        res.send(error);
    }
}