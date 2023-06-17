const mentor = require("../models/mentorModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");

const getallmentors = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await mentor.find({ ismentor: true }).populate("userId");
    } else {
      docs = await mentor.find({ ismentor: true })
        .find({
          _id: { $ne: req.locals },
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get mentors");
  }
};

const getnotmentors = async (req, res) => {
  try {
    const docs = await mentor.find({ ismentor: false })
      .find({
        _id: { $ne: req.locals },
      })
      .populate("userId");

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get non mentors");
  }
};

const applyformentor = async (req, res) => {
  try {
    const alreadyFound = await mentor.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }

    const mentor = mentor({ ...req.body.formDetails, userId: req.locals });
    const result = await mentor.save();

    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    res.status(500).send("Unable to submit application");
  }
};

const acceptmentor = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { ismentor: true, status: "accepted" }
    );

    const mentor = await mentor.findOneAndUpdate(
      { userId: req.body.id },
      { ismentor: true }
    );

    const notification = await Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });

    await notification.save();

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    res.status(500).send("Error while sending notification");
  }
};

const rejectmentor = async (req, res) => {
  try {
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { ismentor: false, status: "rejected" }
    );
    const delDoc = await mentor.findOneAndDelete({ userId: req.body.id });

    const notification = await Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });

    await notification.save();

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

const deletementor = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.userId, {
      ismentor: false,
    });
    const removeDoc = await mentor.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("mentor deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to delete mentor");
  }
};

module.exports = {
  getallmentors,
  getnotmentors,
  deletementor,
  applyformentor,
  acceptmentor,
  rejectmentor,
};
