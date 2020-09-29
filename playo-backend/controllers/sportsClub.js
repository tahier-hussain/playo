//Model
const Admin = require("../models/admin");
const SportsClub = require("../models/sportsClub");

exports.create = (req, res) => {
  console.log(req.body);
  let file;
  if (req.files.file) {
    file = req.files.file;
    console.log(file.data);
    file.mv(`/home/tahier/Codingmart-tasks/playo/playo-frontend/client/public/${file.name}`);
  }

  Admin.findById(req.user.id)
    .select("-password")
    .then(user => {
      const newPost = new SportsClub({
        club_name: req.body.club_name,
        sports_type: req.body.sports_type,
        sports_type_id: req.body.sports_type_id,
        description: req.body.description,
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
  SportsClub.find()
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getOne = (req, res) => {
  SportsClub.findById(req.body.id)
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  Admin.findById(req.user.id)
    .select("-password")
    .then(user => {
      SportsClub.find({ auth_id: req.user.id })
        .then(() => {
          SportsClub.findByIdAndUpdate(req.body.id, req.body)
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
      SportsClub.find({ auth_id: req.user.id })
        .then(() => {
          SportsClub.findByIdAndDelete(req.body.id)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
