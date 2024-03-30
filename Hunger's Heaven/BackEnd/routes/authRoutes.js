const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { fname, lname, email, phno, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ fname, lname, email, phno, password: hashedPassword });
    await newUser.save();
    console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log("Req.body: ", req.body)
      console.log("Attempting login for:", req.body.email); 
      // console.log(req.body);
  
      const user = await User.findOne({ email: req.body.email.toLowerCase() });
      if (!user) {
        console.log("User not found"); // Debug log
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Stored hashed password:', user.password); // Log hashed password retrieved from the database
      console.log('Hashed password from request:', await bcrypt.hash(password, 12)); // Log hashed version of the password provided during login
      

      if (!isMatch) {
        console.log('Hashed password from request:', await bcrypt.hash(password, 12));
        console.log("Password does not match"); // Debug log
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      console.log("Login successful for:", email); // Debug log
      console.log("User id:", user.userId)


      const userResponse = { ...user._doc };

      return res.status(200).json({
        message: "Login successful",
        user: userResponse
      });
    } catch (error) {
      // console.error("Login error:", error); // Debug log
      res.status(500).json({ error: error.message });
    }
  });




// router.get('/:userId', async (req, res) => {
//   console.log(req.params);
 
  
//   try {
//     const user = await User.findOne({userId: req.params.userId});
//     console.log(`Fetching user with ID: ${user}`);
//     console.log('Query result:', user);

//     if (!user) {
//       console.log(`User with ID ${user} not found.`);
//       return res.status(404).send('User not found');
//     }
    
//     res.json(user);
//   } catch (error) {
//     console.error(`Error fetching user with ID ${User}:`, error);
//     res.status(500).send('Error fetching recipe');
//   }
// });

router.get('/:email', async (req, res) => {
  console.log(req.params);
 
  
  try {
    const users = await User.findOne({email: req.params.email});
    console.log(`Fetching user with ID: ${users}`);
    console.log('Query result:', users);

    if (!users) {
      console.log(`User with ID ${users} not found.`);
      return res.status(404).send('User not found');
    }
    
    res.json(users);
  } catch (error) {
    console.error(`Error fetching user with ID :`, error);
    res.status(500).send('Error fetching recipe');
  }
});

module.exports = router;
