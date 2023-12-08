const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const handleFileUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }
    const mediaType = getMediaType(req?.file?.originalname);
    req.fileBuffer = req.file ? req.file.buffer : null;
    req.mediaType = mediaType ? mediaType : null;

    next();
  });
};

const getMediaType = (fileName) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "wmv", "flv"];

  const fileExtension = fileName?.split(".").pop().toLowerCase();

  if (imageExtensions.includes(fileExtension)) {
    return "image";
  } else if (videoExtensions.includes(fileExtension)) {
    return "video";
  } else {
    return null;
  }
};

module.exports = handleFileUpload;
