const { Schema, model } = require("mongoose");

const statuses = {
  CheckedIn: "Checked In",
  CheckedOut: "Checked Out",
};

const checkInStatuses = {
  OnTime: "On Time",
  Late: "Late",
  Leave: "Leave",
  Pending: "Pending",
  Early: "Early",
};

const checkOutStatuses = {
  OnTime: "On Time",
  Overtime: "Overtime",
  Leave: "Leave",
  Pending: "Pending",
  Early: "Early",
};

const Days = {
  Sunday: "Sunday",
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Pending: "Pending",
};

const defaultCheckOutDate = "dd-mm-yyyy";
const defaultCheckOutTime = "00:00 AM/PM";

const attendanceSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(statuses),
      trim: true,
    },
    attendances: [
      {
        checkInDate: {
          type: String,
          trim: true,
        },
        checkInDay: {
          type: String,
          enum: Object.values(Days),
          trim: true,
        },
        checkInTime: {
          type: String,
          trim: true,
        },
        checkInStatus: {
          type: String,
          enum: Object.values(checkInStatuses),
          trim: true,
          default: checkInStatuses.Pending,
        },
        checkOutDate: {
          type: String,
          trim: true,
          default: defaultCheckOutDate,
        },
        checkOutDay: {
          type: String,
          enum: Object.values(Days),
          trim: true,
          default: Days.Pending,
        },
        checkOutTime: {
          type: String,
          trim: true,
          default: defaultCheckOutTime,
        },
        checkOutStatus: {
          type: String,
          enum: Object.values(checkOutStatuses),
          trim: true,
          default: checkOutStatuses.Pending,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Attendance = model("Attendance", attendanceSchema);

module.exports = Attendance;
