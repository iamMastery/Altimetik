const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
  '/',
  [
    check('username', 'Please add username')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('gender','Please add gender')
        .not()
        .isEmpty(),
    check('country','Please select country')
        .not()
        .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password , gender ,firstname,lastname,country } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        username,
        email,
        password,
        gender,
        firstname,
        lastname,
        country
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      return res.json(user);
      // jwt.sign(
      //   payload,
      //   'secret',
      //   {
      //     expiresIn: 360000
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json( {user,token} );
      //   }
      // );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/',async (req,res)=>{
  try{
     let test=User.find().exec((err,users)=>{
       if(err){
         console.log(err)
       }else{
         res.json({users})
       }
     })
   
    
  }catch(err){
    console.error(err.message);
      // res.status(500).send('Server Error');
  }
})


module.exports = router;