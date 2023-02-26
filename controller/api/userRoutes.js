const express = require('express');
const router = express.Router();
const { loginUser, logoutUser, createUser } = require('./userController');

router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/signup', createUser);

module.exports = router;


const passport = require('passport');

function loginUser(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.status(500).json({
        error: 'Failed to authenticate user',
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Invalid username or password',
      });
    } else {
      req.logIn(user, function(err) {
        if (err) {
          res.status(500).json({
            error: 'Failed to set session',
          });
        } else {
          res.status(200).json({
            message: 'User successfully logged in',
          });
        }
      });
    }
  })(req, res);
}
  
  function createUser(req, res) {
    const { username, password } = req.body;
  
    User.findOne({ username: username })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ message: 'Username already taken' });
        }
  
        const newUser = new User({ username: username });
        newUser.setPassword(password);
        newUser.save()
          .then(user => {
            req.login(user, err => {
              if (err) {
                return res.status(500).json({ message: 'Error setting session' });
              }
              return res.status(200).json({ message: 'User created successfully' });
            });
          })
          .catch(err => {
            console.error(err);
            return res.status(500).json({ message: 'Error creating user account' });
          });
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ message: 'Error checking for existing user' });
      });
  }

  function logoutUser(req, res) {
    req.logout(); 
    res.redirect('/login'); 
  }
  
  
  
  module.exports = { loginUser, logoutUser, createUser };
  



