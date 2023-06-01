const Brand = require("../models/brand");
const slugify = require("slugify");
const multer = require("multer");

exports.get = async (req, res) => {
    try {
        const rs = await Brand.find({});
        res.render("brand/list", { brands: rs });
    } catch (err) {
        res.send(err);
    }
}

exports.create = (req, res) => {
    res.render("brand/create_form");
}



// Configure multer to specify the destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads"); // Set the destination folder where the file will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Set the filename for the uploaded file
    },
});

// Create the multer middleware instance
const upload = multer({ storage: storage });

// Update your controller to handle the file upload
exports.save = [
    upload.single("icon"), // Handle a single file upload with the field name "icon"
    async (req, res) => {
        const data = req.body;
        const slug = slugify(data.name, { lower: true });

        let icon = null; // Set a default value for the icon

        // Check if req.file exists (icon uploaded)
        if (req.file) {
            icon = req.file.filename;
        }

        const brand = new Brand({
            ...data,
            slug,
            icon // Save the filename to the 'icon' field in the brand object
        });

        try {
            await brand.save();
            res.redirect("/brands/");
        } catch (error) {
            res.send(error);
        }
    },
];





