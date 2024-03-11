const Employee = require("../models/employees");
const Attendance = require("../models/attendances");
const Shift = require("../models/shifts");
const MongoRepository = require("../repositories/mongodb");
const sendResponse = require("../utilities/send-response");
const employeeModel = new MongoRepository(Employee);
const attendanceModel = new MongoRepository(Attendance);
const { isNotFound } = require("entity-checker");
const {
  extractTimeComponents,
  calculateTimeDifference,
  formatTimeFromTimestamp,
  getCurrentDate,
  getCurrentDay,
} = require("../helpers/formatters");

const services = {
  getAllEmails: async (req, res) => {
    try {
      const allEmails = await employeeModel.find(null, "email");

      return sendResponse(
        res,
        200,
        "All emails fetched successfully",
        allEmails
      );
    } catch (error) {
      console.error("Error in getAllEmails", error);
    }
  },

  verifyEmailAddress: async (req, res) => {
    try {
      const { email, deviceId } = req.body;

      const getEmployee = await employeeModel.findOne({ email });

      if (isNotFound(getEmployee)) {
        return sendResponse(res, 400, "Invalid employee email");
      } else {
        if (isNotFound(getEmployee.deviceId) === true) {
          getEmployee.deviceId = deviceId;
          await getEmployee.save();
          return sendResponse(res, 200, "Email verified successfully");
        } else {
          return sendResponse(
            res,
            400,
            "Another device is already bind with this email"
          );
        }
      }
    } catch (error) {
      console.error("Error in verifyEmailAddress", error);
    }
  },

  sendRequestForApproval: async (req, res) => {
    try {
      const { email, deviceId } = req.body;

      const getEmployee = await employeeModel.findOne({ email });

      if (isNotFound(getEmployee)) {
        return sendResponse(res, 400, "Invalid employee email");
      } else {
        if (isNotFound(getEmployee.deviceId) === true) {
          return sendResponse(res, 400, "You cannot request for approval");
        } else {
          if (getEmployee.deviceId === deviceId) {
            return sendResponse(res, 400, "You cannot request for approval");
          } else {
            if (getEmployee.approval === "Pending") {
              return sendResponse(
                res,
                400,
                "You already requested for approval. Please wait for HR to approve your request"
              );
            } else {
              getEmployee.approval = "Pending";
              await getEmployee.save();
              return sendResponse(
                res,
                200,
                "Your approval request has been sent to HR"
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in sendRequestForApproval", error);
    }
  },

  checkInAndCheckOut: async (req, res) => {
    try {
      const { deviceId } = req.body;

      const getEmployee = await employeeModel.findOne(
        { deviceId },
        null,
        "shift"
      );

      if (isNotFound(getEmployee)) {
        return sendResponse(res, 400, "Invalid device ID");
      } else {
        if (getEmployee.approval === "Pending") {
          return sendResponse(
            res,
            400,
            "Your approval is pending. Please wait for HR to approve your request"
          );
        } else {
          const getEmployeeAttendance = await attendanceModel.findOne({
            employee: getEmployee._id,
          });

          if (isNotFound(getEmployeeAttendance)) {
            await createFirstCheckIn(getEmployee, getEmployee.shift);

            return sendResponse(
              res,
              200,
              "You have been successfully checked in"
            );
          }

          if (getEmployeeAttendance.status === "Checked In") {
            await updateLastCheckIn(getEmployeeAttendance, getEmployee.shift);

            return sendResponse(
              res,
              200,
              "You have been successfully checked out"
            );
          }

          await addNewCheckIn(getEmployeeAttendance, getEmployee.shift);

          return sendResponse(
            res,
            200,
            "You have been successfully checked in"
          );
        }
      }
    } catch (error) {
      console.error("Error in checkInAndCheckOut", error);
    }
  },
};

module.exports = services;

async function createFirstCheckIn(employee, shift) {
  const timeIn = formatTimeFromTimestamp(new Date(Date.now()).getTime());

  const checkInFormData = {
    employee: employee._id,
    status: "Checked In",
    attendances: [
      {
        checkInDate: getCurrentDate(),
        checkInDay: getCurrentDay(),
        checkInTime: timeIn,
        checkInStatus: checkInTime(shift.timings.startTime, timeIn),
      },
    ],
  };

  await attendanceModel.create(checkInFormData);
}

async function updateLastCheckIn(attendance, shift) {
  const timeOut = formatTimeFromTimestamp(new Date(Date.now()).getTime());

  const checkOutFormData = {
    status: "Checked Out",
    attendance: {
      checkOutDate: getCurrentDate(),
      checkOutDay: getCurrentDay(),
      checkOutTime: timeOut,
      checkOutStatus: checkOutTime(shift.timings.endTime, timeOut),
    },
  };
  attendance.status = checkOutFormData.status;
  attendance.attendances.forEach((attendanceItem) => {
    if (attendanceItem.checkOutTime === "00:00 AM/PM") {
      attendanceItem.checkOutDate = checkOutFormData.attendance.checkOutDate;
      attendanceItem.checkOutDay = checkOutFormData.attendance.checkOutDay;
      attendanceItem.checkOutTime = checkOutFormData.attendance.checkOutTime;
      attendanceItem.checkOutStatus =
        checkOutFormData.attendance.checkOutStatus;
    }
  });

  await attendance.save();
}

async function addNewCheckIn(attendance, shift) {
  const newTimeIn = formatTimeFromTimestamp(new Date(Date.now()).getTime());
  const checkInFormData = {
    checkInDate: getCurrentDate(),
    checkInDay: getCurrentDay(),
    checkInTime: newTimeIn,
    checkInStatus: checkInTime(shift.timings.startTime, newTimeIn),
  };
  attendance.attendances.push(checkInFormData);
  attendance.status = "Checked In";

  await attendance.save();
}

function checkInTime(startTime, timeIn) {
  const [startHour, startMinute, startAMPM] = extractTimeComponents(startTime);
  const [timeInHour, timeInMinute, timeInAMPM] = extractTimeComponents(timeIn);

  const minutesDifference = calculateTimeDifference(
    startHour,
    startMinute,
    startAMPM,
    timeInHour,
    timeInMinute,
    timeInAMPM
  );

  if (minutesDifference > 30) {
    return "Late";
  } else if (minutesDifference < -30) {
    return "Early";
  } else if (minutesDifference >= -30 && minutesDifference <= 30) {
    return "On Time";
  } else {
    return "Leave";
  }
}

function checkOutTime(endTime, timeOut) {
  const [endHour, endMinute, endAMPM] = extractTimeComponents(endTime);
  const [timeOutHour, timeOutMinute, timeOutAMPM] =
    extractTimeComponents(timeOut);

  const minutesDifference = calculateTimeDifference(
    endHour,
    endMinute,
    endAMPM,
    timeOutHour,
    timeOutMinute,
    timeOutAMPM
  );

  const THIRTY_MINUTES = 30;

  if (minutesDifference > THIRTY_MINUTES) {
    return "Overtime";
  } else if (minutesDifference < -THIRTY_MINUTES) {
    return "Early";
  } else {
    return "On Time";
  }
}
