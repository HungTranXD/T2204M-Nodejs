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


// Buoi 3: Luu user vao session
const session = require('express-session');
app.use(session({
  secret: 'your-secret-key', // Add a secret key to sign the session ID cookie
  resave: false,
  saveUninitialized: false
}));
// Set up a middleware to fetch `user` from the session
app.use((req, res, next) => {
    // Fetch `user` from the session and make it available globally
    res.locals.user = req.session.user;
    next();
  });


  
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
app.get('/ab?cd', (req, res) => {
    res.send('ab?cd')
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

// Auth
const authRoutes = require("./src/routes/auth.route");
app.use("/auth", authRoutes);



