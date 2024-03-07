const controllers = require("../controllers/controllers");

const router = require("express").Router();

router.get("/emails", controllers.getAllEmailsController);

router.post("/verify-email", controllers.verifyEmailAddressController);

router.post("/send-approval", controllers.sendRequestForApprovalController);

router.post("/check-in-check-out", controllers.checkInAndCheckOutController);

module.exports = router;
