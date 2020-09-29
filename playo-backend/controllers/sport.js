//Model
const Admin = require("../models/admin");
const Sport = require("../models/sports");

exports.create = (req, res) => {
  console.log("HELLO");
  let file;
  if (req.files.file) {
    file = req.files.file;
    console.log(file.data);
    file.mv(`/home/tahier/Codingmart-tasks/playo/playo-frontend/client/public/${file.name}`);
  }

  Admin.findById(req.user.id)
    .select("-password")
    .then(user => {
      const newPost = new Sport({
        name: req.body.name,
        image: file.name
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
  Sport.find()
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  Admin.findById(req.user.id)
    .select("-password")
    .then(user => {
      Sport.find({ auth_id: req.user.id })
        .then(() => {
          Sport.findByIdAndUpdate(req.body.id, req.body)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};

exports.delete = (req, res) => {
  Admin.findById(req.user.id)
    .select("-password")
    .then(user => {
      Sport.find({ auth_id: req.user.id })
        .then(() => {
          Sport.findByIdAndDelete(req.body.id)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
