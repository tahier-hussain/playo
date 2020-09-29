//Model
const User = require("../models/user");
const Member = require("../models/member");

exports.create = (req, res) => {
  console.log(req.body);
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      const newPost = new Member({
        event_id: req.body.id,
        user_id: req.user.id
      });

      newPost
        .save()
        .then(data => res.json(data))
        .catch(() =>
          res.status(400).json({
            msg: "Something went wrong"
          })
        );
    });
};

exports.get = (req, res) => {
  Member.find()
    .sort({ register_date: -1 })
    .then(members => res.json(members))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.delete = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(member => {
      Member.findByIdAndDelete(req.body.id)
        .then(post => res.json(post))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
