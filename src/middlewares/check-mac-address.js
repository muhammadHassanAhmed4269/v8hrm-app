const { isNotFound } = require("entity-checker");
const sendResponse = require("../utilities/send-response");

const checkMacAddress = (req, res, next) => {
  try {
    const { macAddress } = req.query;

    if (isNotFound(macAddress)) {
      return sendResponse(res, 400, "MAC address is required");
    } else {
      if (macAddress === process.env.PHYSICAL_ADDRESS) {
        return next();
      } else {
        return sendResponse(res, 401, "Please connect to V8Digital");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = checkMacAddress;
