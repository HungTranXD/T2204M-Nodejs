const express = require("express");
const app = express();
const database = require("./src/database")
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running...");
})

app.set("view engine", "ejs");
app.use(express.static("public")); // Chỉ được quyền truy cập các file trong thư mục public
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res) => {
    const Product = require("./src/models/product");
    Product.find({})
        .then(rs => {
            res.render("home", {products: rs});
        })
        .catch(err => {
            res.send(err);
        })

    // res.render("home");
})
app.get("/shop", (req, res) => {
    res.send('Shop')
})
app.get("/detail", (req, res) => {
    res.send('Detail')
})

// CRUD for products
const productRoutes = require("./src/routes/product.route");
app.use("/products", productRoutes);

// CRUD for categories
const categoryRoutes = require("./src/routes/category.route");
app.use("/categories", categoryRoutes);

// CRUD for brands
const brandRoutes = require("./src/routes/brand.route");
app.use("/brands", brandRoutes);



