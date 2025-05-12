// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const testBookingRoutes = require('./routes/testbooking');  // Import the test booking routes
const patientLoginRoutes = require("./routes/patientlogin"); // Import the patient login routes
const patientRoutes = require("./routes/patient");
const doctorRoutes = require("./routes/doctor"); 
const clinicRoutes = require("./routes/clinicRegister"); // Import the clinic routes
const bloodRpoutes = require("./routes/blood"); // Import the blood routes
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const path = require("path");
app.use(express.static(path.join(__dirname))); // serve static files like clinics.html

app.get("/clinics", (req, res) => {
  res.sendFile(path.join(__dirname, "clinics.html"));
});



app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 


app.use('/api', clinicRoutes);
app.use("/api", testBookingRoutes);
app.use("/api", patientRoutes);
app.use("/api", patientLoginRoutes); 
app.use("/api", doctorRoutes);
app.use("/api", bloodRpoutes); // Use the blood routes

app.listen(5000, '0.0.0.0', () => {
  console.log('✅ Server is running...');
});