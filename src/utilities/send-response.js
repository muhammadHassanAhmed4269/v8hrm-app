const sendResponse = (res, status, message, data) => {
  try {
    return res.status(status).json({
      headers: { status, message },
      body: data,
    });
  } catch (error) {
    console.error("Error in sendResponse", error);
  }
};

module.exports = sendResponse;
