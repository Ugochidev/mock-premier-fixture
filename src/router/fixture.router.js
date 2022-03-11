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

//route for creating or adding new fixtures
router.post("/addfixture",authenticate, authorize, CreateFixtures);

//route for editing or updating fixtures
router.patch("/updatefixture", authenticate, authorize, editFixtures);

//route for veiwing all fixtures
router.get("/getfixtures", authenticate, viewFixtures);

//route for deleting fixtures
router.delete("/removefixture", authenticate, authorize, removeFixtures);

router.get("/completedfixtures", completedFixtures);
router.get("/pendingfixtures", pendingFixtures);

module.exports = router;
