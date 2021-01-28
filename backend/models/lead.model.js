const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeName: String,
  locations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  ]
});

const LocationsSchema = new mongoose.Schema({
  location: String
});

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String
})
const Employee = mongoose.model("Employee", EmployeeSchema, "employees");
const Location = mongoose.model("Location", LocationsSchema, "locations");
const Lead = mongoose.model("Lead", LeadSchema, "leads")

module.exports = {
  Employee,
  Location,
  Lead
};
