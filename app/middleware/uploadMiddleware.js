const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const handleFileUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }

    req.fileBuffer = req.file ? req.file.buffer : null;

    next();
  });
};

module.exports = handleFileUpload;
