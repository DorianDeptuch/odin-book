const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Notification = require("../models/notification");
const FriendRequest = require("../models/friendRequest");
const { body, validationResult } = require("express-validator");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const toID = mongoose.Types.ObjectId;
require("dotenv").config();

// ██████╗ ██████╗  ██████╗ ███████╗██╗██╗     ███████╗
// ██╔══██╗██╔══██╗██╔═══██╗██╔════╝██║██║     ██╔════╝
// ██████╔╝██████╔╝██║   ██║█████╗  ██║██║     █████╗
// ██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██║██║     ██╔══╝
// ██║     ██║  ██║╚██████╔╝██║     ██║███████╗███████╗
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝

exports.profile_get = (req, res, next) => {
  User.findById(req.params.id)
    .populate({
      path: "posts",
      model: Post,
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "author", model: User },
        {
          path: "comments",
          model: Comment,
          populate: { path: "author", model: User },
        },
      ],
    })
    .populate({
      path: "friends",
      model: User,
      options: { sort: { createdAt: -1 } },
    })
    .populate({
      path: "friendRequests",
      model: FriendRequest,
      options: { sort: { createdAt: -1 } },
    })
    .then((results) => {
      res.json({ results });
    });
};

exports.profileDetailsForm_put = [
  body("hometown").trim().escape(),
  body("currentTown").trim().escape(),
  body("bio").trim().escape(),
  body("employment").trim().escape(),
  body("school").trim().escape(),
  body("hobbies").trim().escape(),
  body("dateOfBirth").trim().escape(),
  body("maritalStatus").trim().escape(),
  body("sex").trim().escape(),

  (req, res, next) => {
    const {
      hometown,
      currentTown,
      bio,
      employment,
      school,
      hobbies,
      dateOfBirth,
      maritalStatus,
      sex,
    } = req.body;
    let errors = [];
    const validationErrors = validationResult(req);

    if (app.locals.user.id !== req.params.id) {
      errors.push({
        msg: "You are not authenticated for this action.",
      });
      return;
    }

    if (!validationErrors.isEmpty()) {
      errors.push({
        msg: "There seems to be an error with one of the fields, please check again.",
      });
    } else {
      User.findById(req.params.id)
        .then((user) => {
          (user.hometown = hometown),
            (user.currentTown = currentTown),
            (user.bio = bio),
            (user.employment = employment),
            (user.school = school),
            (user.hobbies = hobbies),
            (user.dateOfBirth = dateOfBirth.slice(0, 10)),
            (user.maritalStatus = maritalStatus),
            (user.sex = sex),
            user.save().then((user) => {
              res.json({ user });
            });
        })
        .catch((err) => console.log(err));
    }
  },
];

exports.likePost_post = (req, res, next) => {
  const { postID, sender, recipient } = req.body;

  if (app.locals.user.id !== sender) {
    return;
  }

  Post.findById(postID)
    .then((post) => {
      post.likers.push(toID(sender));
      post.likes = post.likes + 1;
      post.save().then((post) => {
        const newNotification = new Notification({
          sender: toID(sender),
          recipient: toID(recipient),
          type: "Liked Post",
          content: postID,
        });
        newNotification.save().then((notification) => {
          User.findById(recipient).then((user) => {
            user.notifications.push(notification);
            user.save().then((user) => {
              res.json(user);
            });
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.unlikePost_post = (req, res, next) => {
  const { postID, sender, recipient } = req.body;

  if (app.locals.user.id !== sender) {
    return;
  }

  Post.findById(postID)
    .then((post) => {
      post.likers.pull(toID(sender));
      post.likes = post.likes - 1;
      post.save().then((post) => {
        // User.findById(recipient).then((user) => {
        // user.notifications.pull({ content: postID });
        // user.save().then((user) => {
        res.json(post);
        // });
        // });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.likeComment_post = (req, res, next) => {
  const { commentID, sender, recipient } = req.body;

  if (app.locals.user.id !== sender) {
    return;
  }

  Comment.findById(commentID)
    .then((comment) => {
      comment.likers.push(toID(sender));
      comment.likes = comment.likes + 1;
      comment.save().then((comment) => {
        res.json({ comment });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.unlikeComment_post = (req, res, next) => {
  const { commentID, sender } = req.body;

  if (app.locals.user.id !== sender) {
    return;
  }

  Comment.findById(commentID)
    .then((comment) => {
      comment.likers.pull(toID(sender));
      comment.likes = comment.likes - 1;
      comment.save().then((comment) => {
        res.json({ comment });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// ███╗   ██╗ ██████╗ ████████╗██╗███████╗██╗ ██████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██║██╔════╝██║██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   ██║█████╗  ██║██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██║╚██╗██║██║   ██║   ██║   ██║██╔══╝  ██║██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ██║██║     ██║╚██████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚═╝╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

exports.notification_poke_post = (req, res, next) => {
  const { sender, content, recipient } = req.body;

  if (app.locals.user.id !== sender) {
    return;
  }

  User.findById(req.params.id).then((user) => {
    const newNotification = new Notification({
      sender: toID(sender),
      recipient: toID(recipient),
      content,
      type: "Poke",
    });
    newNotification.save().then((notification) => {
      user.notifications.push(notification);
      user
        .save()
        .then((user) => {
          res.json(user);
        })
        .catch((err) => console.log(err));
    });
  });
};

exports.friendRequest_post = (req, res, next) => {
  const { sender, recipient } = req.body;

  if (app.locals.user.id !== sender) {
    return;
  }

  User.findById(req.params.id).then((user) => {
    const newFriendRequest = new FriendRequest({
      sender: toID(sender),
      recipient: toID(recipient),
    });
    newFriendRequest.save().then((friendRequest) => {
      user.friendRequests.push(friendRequest);
      user
        .save()
        .then((user) => {
          res.json(user);
        })
        .catch((err) => console.log(err));
    });
  });
};

exports.friendRequest_accept_post = (req, res, next) => {
  const { sender, recipient, friendRequestID } = req.body;

  if (app.locals.user.id !== recipient._id) {
    return;
  }

  User.findById(recipient._id || recipient).then(async (recipientUser) => {
    await recipientUser.friendRequests.pull({ _id: friendRequestID });
    await recipientUser.friends.push({ _id: toID(sender._id) });
    await recipientUser.save().then((user) => {
      User.findById(sender._id).then(async (senderUser) => {
        await senderUser.friends.push({ _id: toID(recipient._id) });

        const newNotification = new Notification({
          recipient: toID(senderUser._id),
          sender: toID(recipientUser._id),
          type: "Friend Request Accept",
        });
        await newNotification.save().then((notification) => {
          senderUser.notifications.push(notification);
          senderUser
            .save()
            .then((user) => {
              res.json(user);
            })
            .catch((err) => console.log(err));
        });
      });
    });
  });
};

exports.friendRequest_deny_post = (req, res, next) => {
  const { sender, recipient, friendRequestID } = req.body;

  if (app.locals.user.id !== recipient._id) {
    return;
  }

  User.findById(recipient._id).then((user) => {
    user.friendRequests.pull({ _id: friendRequestID });
    user
      .save()
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.removeAllNotifications_delete = (req, res, next) => {
  const { user } = req.body;

  if (app.locals.user.id !== user) {
    return;
  }

  User.updateOne(
    { _id: user },
    {
      $set: {
        notifications: [],
      },
    }
  )
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
};

// ███████╗███████╗████████╗████████╗██╗███╗   ██╗ ██████╗ ███████╗
// ██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ ██╔════╝
// ███████╗█████╗     ██║      ██║   ██║██╔██╗ ██║██║  ███╗███████╗
// ╚════██║██╔══╝     ██║      ██║   ██║██║╚██╗██║██║   ██║╚════██║
// ███████║███████╗   ██║      ██║   ██║██║ ╚████║╚██████╔╝███████║
// ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝

exports.settings_get = (req, res, next) => {
  res.json({ user: app.locals.user });
};

exports.settingsProfilePicForm_put = [
  body("profilePicture", "Please submit a valid URL")
    .trim()
    .isLength({ min: 1 }),
  // .escape(),

  (req, res, next) => {
    const { profilePicture, currentUser } = req.body;

    if (app.locals.user.id !== currentUser) {
      return;
    }

    if (app.locals.user.email === process.env.TEST_USER_EMAIL) {
      return;
    }

    let errors = [];
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      errors.push({
        msg: "There seems to be an error with one of the fields, please check again.",
      });
    } else {
      User.findById(app.locals.user.id)
        .then((user) => {
          user.profilePicture = profilePicture;

          user.save().then((user) => {
            res.json({ user });
          });
        })
        .catch((err) => console.log(err));
    }
  },
];

exports.changePasswordForm_put = [
  body("changePasswordForm_Old", "Please enter your current password")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("changePasswordForm_New", "Please enter a new password")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  (req, res, next) => {
    const { changePasswordForm_Old, changePasswordForm_New, currentUser } =
      req.body;
    let errors = [];
    const validationErrors = validationResult(req);

    if (app.locals.user.id !== currentUser) {
      return;
    }

    if (app.locals.user.email === process.env.TEST_USER_EMAIL) {
      return;
    }

    if (!changePasswordForm_Old || !changePasswordForm_New) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (!validationErrors.isEmpty()) {
      errors.push({ msg: "Validation Failed." });
    } else {
      User.findById(app.locals.user.id)
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That User is not registered",
            });
          }
          bcrypt.compare(
            changePasswordForm_Old,
            user.password,
            (err, isMatch) => {
              // if (err) throw err;
              if (err) res.json({ err: err });

              if (isMatch) {
                bcrypt.genSalt(10, (err, salt) =>
                  bcrypt.hash(changePasswordForm_New, salt, (err, hash) => {
                    if (err) throw err;

                    User.findById(app.locals.user.id)
                      .then((user) => {
                        user.password = hash;

                        user.save().then((user) => {
                          res.json({ user });
                        });
                      })
                      .catch((err) => console.log(err));
                  })
                );
              }
            }
          );
        })
        .catch((err) => console.log(err));
    }
  },
];

exports.deleteAccountForm_delete = [
  body("deleteAccountForm").trim().escape(),

  (req, res, next) => {
    const { deleteAccountForm, currentUser } = req.body;
    let errors = [];
    const validationErrors = validationResult(req);

    if (app.locals.user.id !== currentUser) {
      return;
    }

    if (app.locals.user.email === process.env.TEST_USER_EMAIL) {
      return;
    }

    User.findById(app.locals.user.id).then((user) => {
      if (!validationErrors.isEmpty()) {
        errors.push({
          msg: "There seems to be an error with one of the fields, please check again.",
        });
      } else if (
        deleteAccountForm.toLowerCase() === user.fullName.toLowerCase()
      ) {
        User.findByIdAndRemove(app.locals.user.id, function deleteUser(err) {
          if (err) {
            return next(err);
          }
          res.redirect("/login");
          app.locals.user = null;
        });
      } else {
        res.send("Something went wrong");
      }
    });
  },
];

// ██╗███╗   ██╗██████╗ ███████╗██╗  ██╗
// ██║████╗  ██║██╔══██╗██╔════╝╚██╗██╔╝
// ██║██╔██╗ ██║██║  ██║█████╗   ╚███╔╝
// ██║██║╚██╗██║██║  ██║██╔══╝   ██╔██╗
// ██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗
// ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

exports.index_get = (req, res, next) => {
  console.log(app.locals.User);
  if (!app.locals.user) {
    res.status(403).json({ user: null });
    return;
  }
  User.findById(app.locals.user.id)
    .populate({
      path: "posts",
      model: Post,
      options: { sort: { createdAt: -1 } },
      populate: [
        {
          path: "author",
          model: User,
        },
        {
          path: "comments",
          model: Comment,
          populate: { path: "author", model: User },
        },
      ],
    })
    .populate({
      path: "notifications",
      model: Notification,
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "sender", model: User },
        { path: "recipient", model: User },
      ],
    })
    .populate({
      path: "friendRequests",
      model: FriendRequest,
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "sender", model: User },
        { path: "recipient", model: User },
      ],
    })
    .populate({
      path: "friends",
      model: User,
      options: { sort: { createdAt: -1 } },
      populate: [
        {
          path: "posts",
          model: Post,
          populate: [
            { path: "author", model: User },
            {
              path: "comments",
              model: Comment,
              populate: { path: "author", model: User },
            },
          ],
        },
      ],
    })
    .then((user) => {
      res.json({ user });
    });
};

exports.login_get = (req, res, next) => {
  res.send("Welcome to login");
};

exports.logout_get = (req, res, next) => {
  req.logout();
  app.locals.user = null;
  res.json({ msg: "Logging out..." });
};

exports.login_post = [
  body("email", "Please enter an email").trim().isLength({ min: 6 }).escape(),
  body("password", "Please enter a password")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  (req, res, next) => {
    let { email, password } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (!email || !password) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (!validationErrors.isEmpty()) {
      errors.push({ msg: "Validation failed" });
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      } //error exception

      // user will be set to false, if not authenticated
      if (!user) {
        res.status(401).json(info); //info contains the error message
      } else {
        // if user authenticated maintain the session
        req.login(user, function () {
          // do whatever here on successful login
          app.locals.user = user;
          user.lastOnline = new Date(Date.now());
          user.save();
          res.status(200).json({ reqUser: req.user, user: user });
        });
      }
    })(req, res, next);
  },
];

exports.loginExampleUser_post = (req, res, next) => {
  let { email, password } = req.body;

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.status(401).json(info);
    } else {
      req.login(user, function () {
        app.locals.user = user;
        user.lastOnline = new Date(Date.now());
        user.save();
        res.status(200).json({ reqUser: req.user, user: user });
      });
    }
  })(req, res, next);
};

exports.signup_post = [
  body("newEmail", "Please enter an email")
    .isEmail()
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("firstName", "Please enter your first name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Please enter your last name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("newPassword", "Please enter a password")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("confirmPassword", "Please enter a confirmPassword")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  (req, res, next) => {
    let {
      newEmail,
      firstName,
      lastName,
      newPassword,
      confirmPassword,
      dateOfBirth,
      sex,
    } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (
      !newEmail ||
      !newPassword ||
      !confirmPassword ||
      !firstName ||
      !lastName
    ) {
      errors.push({ msg: "Please fill in all required(*) fields" });
    }

    if (newPassword !== confirmPassword) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (newEmail.length < 6) {
      errors.push({ msg: "Email must contain at least 6 characters" });
    }

    if (newPassword.length < 6) {
      errors.push({ msg: "Password must contain at least 6 characters" });
    }

    if (!validationErrors.isEmpty()) {
      errors.push({ msg: "Validation failed " });
    }

    if (errors.length > 0) {
      res.json({ errors, newEmail, firstName, lastName });
    } else {
      User.findOne({ email: newEmail }).then((user) => {
        if (user) {
          errors.push({ msg: "That Email has already been registered" });
          res.json({
            errors,
            newEmail,
            newPassword,
          });
        } else {
          const newUser = new User({
            email: newEmail.toLowerCase(),
            password: newPassword,
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
            dateOfBirth,
            sex,
          });

          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;

              const newNotification = new Notification({
                type: "Welcome Notification",
              });

              newNotification.save();

              newUser.password = hash;
              newUser.notifications.push(newNotification);
              newUser
                .save()
                .then((user) => {
                  const newFriendRequest = new FriendRequest({
                    sender: toID("62009fa86aaded2287b81f0c"),
                    recipient: user._id,
                  });
                  newFriendRequest.save().then((response) => {
                    user.friendRequests.push(newFriendRequest);

                    user.save().then((rez) => {
                      res.redirect("/login");
                    });
                  });
                })
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  },
];

exports.uploadImage = (req, res, next) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.NODE_CLOUDINARY_API_SECRET
  );
  res.statusCode = 200;
  res.json({ signature, timestamp });
};

exports.statusUpdate_post = [
  body("content", "There is no content to submit")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    let { content, author, image, currentUser } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (app.locals.user.id !== currentUser) {
      return;
    }

    if (!content) {
      errors.push({ msg: "Please enter a message to submit" });
    }

    if (errors.length > 0) {
      res.json({ errors });
    } else {
      const newPost = new Post({
        content: content,
        author: toID(author),
        image,
      });
      newPost
        .save()
        .then(async (post) => {
          let user = await User.findById(toID(author));
          user.posts.push(newPost);
          if (image) {
            user.photos.push(image);
          }
          await user.save();

          Post.find().exec(function (err, list_posts) {
            //populate posts ??
            if (err) {
              return next(err);
            }
            res.json({
              error: err,
              post_list: list_posts,
            });
          });
        })
        .catch((err) => console.log(err));
    }
  },
];

exports.postComment_post = [
  body("content", "There is no content to submit")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    // if (req.isAuthenticated()) {
    let { content, author, post, giphy, currentUser } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (app.locals.user.id !== currentUser) {
      return;
    }

    if (!content && !giphy) {
      errors.push({ msg: "Please enter content to submit" });
    }

    if (errors.length > 0) {
      res.json({ errors });
    } else {
      const newComment = new Comment({
        content: content,
        author: toID(author),
        post: toID(post),
        giphy: giphy,
      });
      newComment
        .save()
        .then(async (comment) => {
          let currentPost = await Post.findById(toID(post));
          currentPost.comments.push(newComment);
          await currentPost.save();

          if (app.locals.user.id !== newComment.author._id) {
            User.findById(currentPost.author._id).then((user) => {
              const newNotification = new Notification({
                sender: toID(app.locals.user.id),
                recipient: toID(currentPost.author._id),
                content: currentPost._id,
                type: "Comment On Post",
              });
              newNotification.save().then((notification) => {
                user.notifications.push(notification);
                user
                  .save()
                  .then((user) => {
                    console.log(user);
                  })
                  .catch((err) => console.log(err));
              });
            });
          }

          Comment.find().exec(function (err, list_comments) {
            //populate comments ??
            if (err) {
              return next(err);
            }
            res.json({
              error: err,
              comment_list: list_comments,
            });
          });
        })
        .catch((err) => console.log(err));
    }
  },
];

exports.search_get = (req, res, next) => {
  User.find({}, { firstName: 1, lastName: 1, profilePicture: 1 }).then(
    (results) => res.json({ results })
  );
};
