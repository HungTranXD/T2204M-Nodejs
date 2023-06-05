const User = require("../models/user");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");
const config_mail = {
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "tranhung02011990@gmail.com",
        pass: "phoppvultelyrsfv"
    }

}
const transport = nodemailer.createTransport(config_mail);

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
        req.session.auth = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

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
        req.session.auth = {
            _id: existUser._id,
            name: existUser.name,
            email: existUser.email
        };

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
        // Get the user from database
        const user = User.findOne({ _id: req.session.auth._id })
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
    req.session.auth = null;
    // Redirect to the desired page after logout
    res.redirect('/products');
};


exports.forgot_pw_form = (req, res) => {
    res.render("auth/forgot")
};

exports.forgot = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email: email});
        if (!user) return res.redirect("auth/forgot-password");
        // Neu co email thi:
        const randomString = btoa(user.email);
        const resetLink = "http://localhost:3000/auth/reset-password?code="+randomString;
        // Luu code vao session:
        req.session.resetPassword = {
            user: user,
            code: randomString
        }
        // Send email:
        transport.sendMail({
            from: "Demo Nodejs T2204M",
            to: user.email,
            cc: "",
            subject: "Lay lai mat khau tai khoan",
            html: `<p>Click <a href="${resetLink}"> to reset password</p>`
        })
        res.send("Check you email.")
    } catch (err) {
        res.send(err);
    }
};

exports.reset_pw_form = (req, res) => {
    // Check code:
    const code = req.query.code;
    const resetSession = req.session.resetPassword;
    if (code != resetSession.code) return res.status(404).send("Error");
    res.render("auth/reset");
};

exports.reset = async (req, res) => {
    const new_pass = req.body.password;
    const resetSession = req.session.resetPassword;
    const user = resetSession.user;
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(new_pass, salt);

    await User.findByIdAndUpdate(user._id, {password: hassPassword});
    req.session.resetPassword = null,
    res.send("DONE");
}

