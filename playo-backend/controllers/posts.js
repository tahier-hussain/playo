//Model
const User = require("../models/user");
const Post = require("../models/post");
const Member = require("../models/member");

exports.create = (req, res) => {
  let file;
  if (req.files.file) {
    file = req.files.file;
    console.log(file.data);
    file.mv(`/home/tahier/Codingmart-tasks/playo/playo-frontend/client/public/${file.name}`);
  }

  console.log(req.body);
  User.findById(req.user.id)
    .select("-password")
    .then(() => {
      const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        sports_club_id: req.body.sports_club_id,
        sports_club_name: req.body.sports_club_name,
        sports_type_id: req.body.sports_type_id,
        sports_type_name: req.body.sports_type_name,
        no_of_slots: req.body.no_of_slots,
        no_of_slots_available: req.body.no_of_slots,
        date_of_event: req.body.date_of_event,
        time_of_event: req.body.time_of_event,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      });

      if (file) {
        newPost["image"] = file.name;
      }

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
  Post.find()
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getUpcomingEventsTwo = async (req, res) => {
  let today = new Date();
  let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let result = [];
  let index = 0;
  let posts = await Post.find()
    .sort({ date_of_event: 1 })
    .then(async data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].date_of_event);
        console.log(date);
        if (await (parseInt(data[i].date_of_event.substring(0, 4)) == today.getFullYear())) {
          if (await (parseInt(data[i].date_of_event.substring(5, 7)) == today.getMonth() + 1)) {
            if (await (parseInt(data[i].date_of_event.substring(8, 10)) >= today.getDate())) {
              result[index++] = data[i];
            }
          } else if (await (parseInt(data[i].date_of_event.substring(5, 7)) > today.getMonth() + 1)) {
            result[index++] = data[i];
          }
        } else if (await (parseInt(data[i].date_of_event.substring(0, 4)) > today.getFullYear())) {
          result[index++] = data[i];
        }
        if (await (index == 2)) {
          break;
        }
      }
      console.log(result);
      return result;
    });
  res.json(posts);
};

exports.getUpcomingEvents = async (req, res) => {
  if (req.body.latitude && req.body.longitude) {
    let today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let result = [];
    let index = 0;
    let posts = await Post.find()
      .sort({ date_of_event: 1 })
      .then(async data => {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].date_of_event);
          console.log(date);
          if (await (parseInt(data[i].date_of_event.substring(0, 4)) == today.getFullYear())) {
            if (await (parseInt(data[i].date_of_event.substring(5, 7)) == today.getMonth() + 1)) {
              if (await (parseInt(data[i].date_of_event.substring(8, 10)) >= today.getDate())) {
                result[index++] = data[i];
              }
            } else if (await (parseInt(data[i].date_of_event.substring(5, 7)) > today.getMonth() + 1)) {
              result[index++] = data[i];
            }
          } else if (await (parseInt(data[i].date_of_event.substring(0, 4)) > today.getFullYear())) {
            result[index++] = data[i];
          }
        }
        console.log(result);
        return result;
      });
    let nearestEvents = [];
    index = 0;
    for (let i = 0; i < result.length; i++) {
      if (Math.abs(parseInt(result[i].latitude) - parseInt(req.body.latitude)) <= 1) {
        console.log(Math.abs(parseInt(result[i].latitude) - parseInt(req.body.latitude)));
        nearestEvents[index++] = result[i];
      }
    }
    res.json(nearestEvents);
  } else {
    console.log("HELLO");
    Post.find()
      .sort({ date_of_event: 1 })
      .then(data => res.json(data))
      .catch(() => res.status(400).json({ msg: "Something went wrong" }));
  }
};

exports.getSingleClubPosts = async (req, res) => {
  Post.find({ sports_club_id: req.body.id })
    .then(async posts => {
      res.json(posts);
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getUserPost = (req, res) => {
  User.findById(req.user.id).then(user => {
    Post.find({ auth_id: user.id })
      .sort({ register_date: -1 })
      .then(posts => res.json(posts))
      .catch(() => res.status(400).json({ msg: "Something went wrong" }));
  });
};

exports.updateAvailableSlots = (req, res) => {
  console.log(req.body);
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      Post.findById(req.body.id).then(data => {
        Post.findByIdAndUpdate(req.body.id, { no_of_slots_available: data.no_of_slots_available - 1 })
          .then(post => res.json(post))
          .catch(() => res.status(400).json({ msg: "Something went wrong" }));
      });
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.scheduledGames = (req, res) => {
  Member.find({ user_id: req.user.id })
    .then(async member => {
      let result = [];
      for (let i = 0; i < member.length; i++) {
        result[i] = await Post.findById(member[i].event_id)
          .then(post => {
            return post;
          })
          .catch(() => res.status(400).json({ msg: "Something went wrong" }));
      }
      await res.json(result);
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      Post.find({ auth_id: req.user.id })
        .then(() => {
          Post.findByIdAndUpdate(req.body.id, req.body)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};

exports.delete = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      Post.find({ auth_id: req.user.id })
        .then(() => {
          Post.findByIdAndDelete(req.body.id)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
