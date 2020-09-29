const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Admin Model
const Admin = require("../models/admin");

exports.login = (req, res) => {
  const { email, password } = req.body;
  //Simple validation
  if (!email || !password) {
    return res.json({
      status: 400,
      msg: "Please enter all the fields "
    });
  }

  //Check for existing admin
  Admin.findOne({ email }).then(admin => {
    if (!admin)
      return res.json({
        status: 400,
        msg: "Admin does not exist "
      });

    //Validate password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (!isMatch)
        return res.json({
          status: 400,
          msg: "Invalid Credentials"
        });

      jwt.sign({ id: admin.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          status: 200,
          token,
          users: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            type: "admin",
            message: "Logged in successfully"
          }
        });
      });
    });
  });
};
