const express = require("express");
const mentorController = require("../controllers/mentorController");
const auth = require("../middleware/auth");

const mentorRouter = express.Router();

mentorRouter.get("/getallmentors", mentorController.getallmentors);

mentorRouter.get("/getnotmentors", auth, mentorController.getnotmentors);

mentorRouter.post("/applyformentor", auth, mentorController.applyformentor);

mentorRouter.put("/deletementor", auth, mentorController.deletementor);

mentorRouter.put("/acceptmentor", auth, mentorController.acceptmentor);

mentorRouter.put("/rejectmentor", auth, mentorController.rejectmentor);

module.exports = mentorRouter;
