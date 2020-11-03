const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../../service/passport');

const UsersController = require('../../controllers/users');

const passportSignIn = passport.authenticate('local', { session: false });

router.route('/signin').post(passportSignIn, UsersController.signIn);

// router.post('/signin', passportSignIn, UsersController.signIn);
// router.post('/signin', passportSignIn, UsersController.signIn);
// router.post('/signin',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });
// router.get("/test", (req, res) =>
//   res.json({
//     msg: "ads test Works"
//   })
// );
module.exports = router;
