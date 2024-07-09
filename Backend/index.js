require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: "https://job-hunt-zeta-gold.vercel.app", 
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
};

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

app.use(express.json({ extended: false }));
app.options("*" , cors(corsOptions));
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

connectDB();

const companyRoutes = require('./routes/companyRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const jobRoutes = require('./routes/jobRoutes');
const postRoutes = require('./routes/postRoutes');
const adRoutes = require('./routes/adRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/company', companyRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/applicant', applicantRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/search', userRoutes);
app.use('/api/follow', userRoutes);
app.use('/api/company/profile/:uid', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
