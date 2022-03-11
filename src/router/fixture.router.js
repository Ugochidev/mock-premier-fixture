const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const {
  CreateFixtures,
  editFixtures,
  viewFixtures,
  removeFixtures,
  completedFixtures,
  pendingFixtures,
} = require("../controllers/fixtures.ctrl");

const router = express.Router();

//  creating a route
router.post("/addfixture", authenticate, authorize, CreateFixtures);
router.patch("/updatefixture", authenticate, authorize, editFixtures);
router.get("/getfixtures", authenticate, viewFixtures);
router.delete("/removefixture", authenticate, authorize, removeFixtures);
router.get("/completedfixtures", completedFixtures);
router.get("/pendingfixtures", pendingFixtures);

module.exports = router;
