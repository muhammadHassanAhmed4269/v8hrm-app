const mongoose = require("mongoose");

const approvalStatuses = ["Pending", "Approved"];

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    deviceId: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      type: String,
      trim: true,
    },
    nicNumber: {
      type: String,
      trim: true,
    },
    nicFrontPicture: {
      type: String,
      trim: true,
    },
    nicBackPicture: {
      type: String,
      trim: true,
    },
    nextToKin: {
      type: String,
      trim: true,
    },
    relationToKin: {
      type: String,
      trim: true,
    },
    homeAddress1: {
      type: String,
      trim: true,
    },
    homeAddress2: {
      type: String,
      trim: true,
    },
    cv: {
      type: String,
      trim: true,
    },
    // ---------------------------------------------------------------------------
    units: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
        trim: true,
      },
    ],
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        trim: true,
      },
    ],
    designations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation",
        trim: true,
      },
    ],
    reportingTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      trim: true,
    },
    joiningDate: {
      type: String,
      trim: true,
    },
    jobType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job Type",
      trim: true,
    },
    // ---------------------------------------------------------------------------
    grossSalary: {
      type: String,
      trim: true,
    },
    basicSalary: {
      type: String,
      trim: true,
    },
    houseRent: {
      type: String,
      trim: true,
    },
    utility: {
      type: String,
      trim: true,
    },
    medicalAllowance: {
      type: String,
      trim: true,
    },
    taxableIncome: {
      type: String,
      trim: true,
    },
    incomeTax: {
      type: String,
      trim: true,
    },
    eobi: {
      type: String,
      trim: true,
    },
    bankCharges: {
      type: String,
      trim: true,
    },
    // ---------------------------------------------------------------------------
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
    },
    ibanNumber: {
      type: String,
      trim: true,
    },
    remittanceType: {
      type: String,
      trim: true,
    },
    // ---------------------------------------------------------------------------
    role: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        trim: true,
      },
    ],
    // ---------------------------------------------------------------------------
    insurance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Insurance",
      trim: true,
    },
    carAllowance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Allowance",
      trim: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      trim: true,
    },
    casualLeaves: {
      type: Number,
      trim: true,
    },
    annualLeaves: {
      type: Number,
      trim: true,
    },
    // ---------------------------------------------------------------------------
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      trim: true,
    },
    // ---------------------------------------------------------------------------
    approval: {
      type: String,
      enum: approvalStatuses,
      trim: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
