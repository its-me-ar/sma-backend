const Notification = require("../models/notifications.model");

const getNotificationsByID = async (_req, res) => {
  // #swagger.tags = ['Get All Notifications']
  try {
    const { userId } = _req.user;
    const notifications = await Notification.find({
      receiverId: userId,
    }).populate("senderId");
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const updateNotificationStatus = async (_req, res) => {
  // #swagger.tags = ['Update Notification Status']
  try {
    const { params } = _req;

    await Notification.findByIdAndUpdate(
      params?.id,
      {
        $set: {
          isOpen: true,
        },
      },
      {
        new: true,
      }
    );
    return res.status(201).json({ message: "Notification Updated" });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getNotificationsByID,
  updateNotificationStatus,
};
