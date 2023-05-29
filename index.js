const express = require("express");
const app = express();
const database = require("./src/database")
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running...");
})

app.set("view engine", "ejs");
app.use(express.static("public")); // Chỉ được quyền truy cập các file trong thư mục public


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


//This is code for feature-1 branch
