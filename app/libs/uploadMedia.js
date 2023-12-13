const cloudinary = require("../config/cloudinary.config");
const { Readable } = require("stream");

async function uploadMedia(buffer, fileName, type, folder, mediaType) {
  return new Promise((res, rej) => {
    const theTransformStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        public_id: `${type}_${fileName}`,
        resource_type: mediaType === "video" ? "video" : "auto",
      },
      (err, result) => {
        if (err) {
          return rej(err);
        }
        res(result);
      }
    );
    let str = Readable.from(buffer);
    str.pipe(theTransformStream);
  });
}

module.exports = uploadMedia;
