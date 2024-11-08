const express = require('express');
const appointmentRoutes = require('../models/AppointmentSchema');
const router = express.Router();
// const { isAdmin } = require("../checkuser");
// const Appointment = require('../models/AppointmentSchema');
const Middleware = require("../verify");


router.post('/appointments', async (req, res) => {
    const { name, email, phoneNumber, address, message } = req.body;
  
    if (!name || !email || !phoneNumber || !address || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }
  
    const newAppointment = new appointmentRoutes({
      name,
      email,
      phoneNumber,
      address,
      message
    });
  
    try {
      await newAppointment.save();
      res.status(200).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating appointment', error: error.message });
    }
  });

  router.get("/all-appointments", Middleware, async(req, res)=>{
    try{const app = await appointmentRoutes.find({});

    return res.status(200).json(app);
  }
  catch(e){
    return res.status(400).json({message: e});
  }
    
  });
  
  module.exports = router;