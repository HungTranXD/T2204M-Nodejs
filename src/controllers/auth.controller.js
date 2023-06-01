const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    res.render("auth/register");
}

exports.create_user = async (req, res) => {
    try {
        let existUser = await User.findOne({ email: req.body.email });
        if (existUser) return res.status(422).send("User've already existed.");
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hassPassword = await bcrypt.hash(req.body.password, salt);
        //save to db
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hassPassword
        })
        await user.save();
        // Save user information in session
        req.session.user = existUser;

        res.redirect('/products');
    } catch (err) {
        res.send(err);
    }
}

exports.login = (req, res) => {
    res.render("auth/login");
}

exports.loginUser = async (req, res) => {
    try {
        let existUser = await User.findOne({ email: req.body.email });
        if (!existUser) return res.status(422).send("Email or password is not correct.");
        const verified = await bcrypt.compare(req.body.password, existUser.password);
        if (!verified) return res.status(422).send("Email or password is not correct.");

        // Save user information in session
        req.session.user = existUser;

        //login successfully
        res.redirect('/products');
    } catch (err) {
        res.send(err);
    }
}

exports.changePassword = (req, res) => {
    res.render("auth/change_password");
}

exports.changePasswordSave = async (req, res) => {
    try {
        const user = req.session.user;
        // Compare the old pass input to current pass
        const verified = await bcrypt.compare(req.body.old_password, user.password);
        if (!verified) return res.status(422).send("Wrong old password");
        // Compare the new pass to the old pass
        const verified1 = await bcrypt.compare(req.body.new_password, user.password);
        if (verified1) return res.status(422).send("New password is the same as old password");

        // Save the new pass
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hassPassword = await bcrypt.hash(req.body.new_password, salt);

        // Update the user's password
        // user.password = hassPassword;
        // Save the updated user to the database
        // await user.save(); //save() dont work because user is not an instant of User model

        await User.findOneAndUpdate(
            { _id: user._id },
            { $set: { password: hassPassword } }
          );
          res.redirect('/auth/change-password');
    } catch (err) {
        res.send(err);
    }
}

exports.logout = (req, res) => {
    // Clear the user session
    req.session.user = null;
    // Redirect to the desired page after logout
    res.redirect('/products');
  };