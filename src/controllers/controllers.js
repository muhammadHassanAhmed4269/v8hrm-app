const services = require("../services/services");

const controllers = {
  getAllEmailsController: async (req, res) => {
    try {
      return await services.getAllEmails(req, res);
    } catch (error) {
      console.error("Error in getAllEmailsController", error);
    }
  },

  verifyEmailAddressController: async (req, res) => {
    try {
      return await services.verifyEmailAddress(req, res);
    } catch (error) {
      console.error("Error in verifyEmailAddressController", error);
    }
  },

  sendRequestForApprovalController: async (req, res) => {
    try {
      return await services.sendRequestForApproval(req, res);
    } catch (error) {
      console.error("Error in sendRequestForApprovalController", error);
    }
  },

  checkInAndCheckOutController: async (req, res) => {
    try {
      return await services.checkInAndCheckOut(req, res);
    } catch (error) {
      console.error("Error in checkInAndCheckOutController", error);
    }
  },
};

module.exports = controllers;
