require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const multer = require("multer");
const app = express();
const path = require('path');



const port = process.env.PORT || 3000;


// Middleware
app.use(cors()); // Enables CORS
app.use(express.json());
app.use(bodyParser.json()); // Parses JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));



// Email transporter setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Define a schema for the form data
const formSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
});

// Create a model from the schema
const Form = mongoose.model('Form', formSchema);

// Route for form submission
app.post('/submit', async (req, res) => {
  const { name, phone, email, message } = req.body;

  // Save to MongoDB
  const formData = new Form({ name, phone, email, message });
  await formData.save();

  // Send email
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Form Submission Confirmation',
    text: `Hello ${name},\n\nThank you for your submission. We will contact you soon.\n\nBest,\n[Your Name or Company]`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Form submitted successfully');
    }
  });
});

// Use routes
app.use('/api/user', authRoutes);
app.use('/api/recipes', recipeRoutes);


//Image storage engine

const storage = multer.diskStorage({
  destination: './upload/images', 
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({storage:storage });

// Upload endpoint
app.use('/images',express.static('upload/images'))
app.post('/upload', upload.single('images'), (req, res) => {
  try {
    // Send back information about the uploaded file
    console.log('File uploaded successfully:', req.file);
    res.json({
      success:1,
      image_url:`http://localhost:${port}/images/${req.file.filename}`
    });
  } catch (error) {
    console.error('Error in file upload:', error);
    res.status(500).send(error.message);
  }
});





app.listen(port, () => console.log(`Server running on port ${port}`));
