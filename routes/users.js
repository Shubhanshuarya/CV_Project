const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');

// Register
// router.post('/register', (req, res) => {
//   console.log(req.body);
//   const { name, email, password, cpass } = req.body;
//   let errors = [];

//   if (!name || !email || !password || !cpass) {
//     errors.push({ msg: 'Please enter all fields' });
//   }

//   if (password != cpass) {
//     errors.push({ msg: 'Passwords do not match' });
//   }

//   if (password.length < 6) {
//     errors.push({ msg: 'Password must be at least 6 characters' });
//   }

//   if (errors.length > 0) {
//     res.render('register', {
//       errors,
//       name,
//       email,
//       password,
//       cpass
//     });
//   } else {
//     User.findOne({ email: email }).then(user => {
//       if (user) {
//         errors.push({ msg: 'Email already exists' });
//         console.log("Error aa rahi hai");
//         res.render('http://localhost:4200/register', {
//           errors,
//           name,
//           email,
//           password,
//           cpass
//         });
//       } else {
//         const newUser = new User({
//           name,
//           email,
//           password
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => {
//                 req.flash(
//                   'success_msg',
//                   'You are now registered and can log in'
//                 );
//                 res.redirect('http://localhost:4200/login');
//               })
//               .catch(err => console.log(err));
//           });
//         });
//       }
//     });
//   }
// });

router.post("/register", function (req, res, next) {
  addToDB(req, res);
});

async function addToDB(req, res) {
  var user = new User({
    email: req.body.email,
    name: req.body.name,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now(),
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  } catch (err) {
    return res.status(501).json(err);
  }
}

// Login
router.post("/login", function (req, res, next) {
  console.log(req.body);
  User.findOne({ email: req.body.email })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({
              message: `Cannot Update user with ${email}. Maybe user not found!`,
            });
        } else {
          console.log(data);
          const id = data._id;
          res.redirect(`dashboard/${id}`);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update user information" });
  });

  // passport.authenticate('local', {
  //   successRedirect: `/users/dashboard/:${id}`,
  //   failureRedirect: '/users/login',
  //   failureFlash: true
  // })(req, res, next);
});

router.get('/dashboard/:id', function(req, res, next){
  console.log(req.params.id);
  // console.log(req.isAuthenticated());
  // if(!req.isAuthenticated()){
  //   return res.status(401).json({ message: "Unauthorized Request" });
  // }
  // return res.status(200).json(req.user);
  User.findById({ _id: req.params.id })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({
              message: `Cannot Update user with ${id}. Maybe user not found!`,
            });
        } else {
          // console.log(data);

          return res.status(200).json(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update user information" });
      });
})

// Logout
router.get("/logout", function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: "Logout Success" });
});
// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });

// function isValidUser(req, res, next) {
//   console.log(req.isAuthenticated());
//   if (req.isAuthenticated()){next();}
//   return res.status(401).json({ message: "Unauthorized Request" });
// }

router.post("/resumegenerator/:id", function (req, res, next){
  console.log(req.params);
  User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false})
  .then((data) => {
    if (!data) {
      res
        .status(404)
        .send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
    } else {
      console.log(data);
      // res.status(200).json({message: `<h1>Thanks for updating data</h1><p><a href="/ge">Go Back to Dashboard</a>`});
      res.status(200).json({message: 'Resume Generated'});
      alert('Data Updated Successfully');
    }
  })
  .catch((err) => {
    res.status(500).send({ message: "Error Update user information", err});
  });
})

router.get('/resumefetch/:id', function(req, res, next){
  console.log(req.params.id);
  // console.log(req.isAuthenticated());
  // if(!req.isAuthenticated()){
  //   return res.status(401).json({ message: "Unauthorized Request" });
  // }
  // return res.status(200).json(req.user);
  User.findById({ _id: req.params.id })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({
              message: `Cannot Update user with ${id}. Maybe user not found!`,
            });
        } else {
          // console.log(data);

          return res.status(200).json(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update user information" });
      });
})

module.exports = router;