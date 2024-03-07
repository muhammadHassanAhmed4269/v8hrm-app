function getCurrentDate() {
  try {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  } catch (error) {
    console.log(error);
  }
}

function getCurrentDay() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date().getDay();
  const currentDay = days[today];

  return currentDay;
}

function formatTimeFromTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

function extractTimeComponents(time) {
  const [hourMinute, ampm] = time.split(" ");
  const [hour, minute] = hourMinute.split(":");
  return [parseInt(hour), parseInt(minute), ampm];
}

function calculateTimeDifference(hour1, minute1, ampm1, hour2, minute2, ampm2) {
  let time1 = hour1 * 60 + minute1;
  let time2 = hour2 * 60 + minute2;

  if (ampm1 !== ampm2 && ampm1 === "AM" && ampm2 === "PM") {
    time2 += 12 * 60;
  } else if (ampm1 !== ampm2 && ampm1 === "PM" && ampm2 === "AM") {
    time1 += 12 * 60;
  }

  return time2 - time1;
}

module.exports = {
  getCurrentDate,
  getCurrentDay,
  formatTimeFromTimestamp,
  extractTimeComponents,
  calculateTimeDifference,
};
