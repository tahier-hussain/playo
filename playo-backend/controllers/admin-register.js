const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Admin Model
const Admin = require("../models/admin");

exports.register = (req, res) => {
  console.log(req.body);
  const { name, email, password, confirm_password } = req.body;

  console.log(req.body);

  //Simple validation
  if (!name || !email || !password || !confirm_password) {
    return res.json({
      status: 400,
      msg: "Please enter all the fields "
    });
  }
  //Check for existing admin
  Admin.findOne({ email }).then(admin => {
    if (admin)
      return res.json({
        status: 400,
        msg: "Admin already exists "
      });

    if (password != confirm_password) {
      return res.json({
        status: 400,
        msg: "Password Didn't match"
      });
    }

    if (password.length < 8) {
      return res.json({
        status: 400,
        msg: "Password should be atleast 8 characters"
      });
    }

    var number = 0;
    var low_alph = 0;
    var up_alph = 0;
    var spl_char = 0;
    for (var i = 0; i < password.length; i++) {
      var ascii = password.charCodeAt(i);
      if (ascii >= 48 && ascii <= 57) {
        number = 1;
      } else if (ascii >= 65 && ascii <= 90) {
        up_alph = 1;
      } else if (ascii >= 97 && ascii <= 122) {
        low_alph = 1;
      } else {
        spl_char = 1;
      }
    }

    if (number != 1 || low_alph != 1 || up_alph != 1 || spl_char != 1) {
      return res.json({
        status: 400,
        msg: "Password not efficient"
      });
    }

    const newAdmin = new Admin({
      name,
      email,
      password
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        if (err) throw err;
        newAdmin.password = hash;
        newAdmin.save().then(admin => {
          jwt.sign({ id: admin.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              status: 200,
              users: {
                id: admin.id,
                name: admin.name,
                email: admin.email
              }
            });
          });
        });
      });
    });
  });
};
