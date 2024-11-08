const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;