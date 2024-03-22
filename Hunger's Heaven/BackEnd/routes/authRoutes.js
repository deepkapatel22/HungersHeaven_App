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

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     // Handle session/token creation here
//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Attempting login for:", email); // Debug log
      console.log(req.body);
  
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
      // Proceed with token creation or session management here
      
      return res.status(200).json({ message: "Login successful",data: JSON.parse(JSON.stringify(user)) });
    } catch (error) {
      console.error("Login error:", error); // Debug log
      res.status(500).json({ error: error.message });
    }
  });

// router.get('/profile', async (req, res) => {
//     try {
//       const userId = req.query.userId; // Ensure you have a way to identify the user, e.g., through authentication tokens
//       const user = await User.findById(userId).exec(); // Use exec() for better error handling with async/await
//       if (!user) {
//         return res.status(404).send('User not found');
//       }
//       res.json(user);
//     } catch (error) {
//       res.status(500).send(error.toString());
//     }
//   });
// router.get('/profile/:userId', async (req, res) => {
//   const id = req.params.userId;
//   try {
//     console.log("Hello");
//     console.log("id: "+id);
//     const user = await User.findOne({ userId: id });
//     console.log(user);
//     res.json(user);
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// });
// router.get('/profile/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findOne({userId: userId});
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     // Optionally, exclude the password from the result
//     // const { password, ...userDetails } = user.toObject();
//     res.status(200).json(user);
//     console.log(user);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching user with ID: ${userId}`);
  
  try {
    const user = await User.findOne({userId: userId});
    console.log('Query result:', user);

    if (!user) {
      console.log(`User with ID ${userId} not found.`);
      return res.status(404).send('User not found');
    }
    
    res.json(user);
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    res.status(500).send('Error fetching recipe');
  }
});

module.exports = router;
